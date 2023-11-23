#!/bin/sh

echo ""
echo "Loading azd .env file from current environment"
echo ""

while IFS='=' read -r key value; do
    value=$(echo "$value" | sed 's/^"//' | sed 's/"$//')
    export "$key=$value"
done <<EOF
$(azd env get-values)
EOF

if [ $? -ne 0 ]; then
    echo "Failed to load environment variables from azd environment"
    exit $?
fi

echo 'Creating python virtual environment "backend/backend_env"'
python3 -m venv backend/backend_env

echo ""
echo "Restoring backend python packages"
echo ""

cd backend
./backend_env/bin/python -m pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Failed to restore backend python packages"
    exit $?
fi

echo ""
echo "Restoring frontend npm packages"
echo ""

cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to restore frontend npm packages"
    exit $?
fi

mode=${1:-dev}
if [ "$mode" != "dev" ] && [ "$mode" != "prod" ]; then
    echo "Mode must be dev or prod"
    exit 1
fi

echo ""
echo "Building frontend in $mode mode"
echo ""

npm run build:"$mode"
if [ $? -ne 0 ]; then
    echo "Failed to build frontend"
    exit $?
fi

first_folder=$(ls -d ./dist/*/ | head -n 1)
if [ -z "$first_folder" ]; then
    echo "No folder found inside ./dist"
    exit 1
fi

mkdir -p ../backend/static
cp -r "$first_folder"* ../backend/static

echo ""
echo "Starting backend"
echo ""

cd ../backend

port=50505
host=localhost
./backend_env/bin/python -m quart --app main:app run --port "$port" --host "$host" --reload
if [ $? -ne 0 ]; then
    echo "Failed to start backend"
    exit $?
fi
