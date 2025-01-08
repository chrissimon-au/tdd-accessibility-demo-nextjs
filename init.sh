# a record of the create-next-app command used to initialise the app
APP_NAME=tdd-accessibility-demo-nextjs
npx create-next-app@latest $APP_NAME --ts --tailwind --eslint --app --no-import-alias --src-dir --turbopack --use-npm
mv $APP_NAME/* $APP_NAME/.[!.]* .
rmdir $APP_NAME