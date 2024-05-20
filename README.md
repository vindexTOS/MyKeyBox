# Building App For Android

## Must have:

- Expo Dev Account: [Expo Dev](https://expo.dev/)
- Global Installations:
  - Expo CLI: `npm i expo-cli`
  - EAS CLI: `npm install -g eas-cli`
  - Java: [Installation Tutorial](https://www.youtube.com/watch?v=SQykK40fFds&t=373s)
  - AAB Converter: [Google Bundletool Releases](https://github.com/google/bundletool/releases)
  - Node.js: [Node.js](https://nodejs.org/)

## Build Setup

Ensure the end folder structure is set up like this: [Example Structure](https://github.com/vindexTOS/abb-to-apk-convertor)

### Step 1: Create New Folder

Create a new folder and name it `apk-convertor`. Download `bundletool.jar` from [Bundletool](https://github.com/google/bundletool/releases). (Remove version numbers next to it ex 1.2.5  for convenience and keep only `bundletool.jar`)

### Step 2: Dependency Check

Navigate to your React Native app directory and run:
```
npx expo-doctor
npx expo-doctor --fix-dependencies
npx expo install –-check  
This will check and fix any dependency issues.
```

### Step 3: Build AAB
Stay in the same directory and run: ```eas build -p android```
it will ask you to enter your expo dev account email and password
this will build aab file for your app on your https://expo.dev/ 

### step 4:
 download build aab file from https://expo.dev/ ,it would be named ex application-800bd69f-8a8f-441b-9f6b-d15fecd07728.aab   
save it on apk-convertor folder with bundletool.jar 

### step 5: build APKS file 
(keep in mind this is not apk file, but apks )
go to apk-convertor directory and run 
 
```java -jar bundletool.jar build-apks --bundle=filename.aab --output=newfilename.apks --mode=universal```
 
(filename.abb should be your expo.dev downloaded aab file, you can name newfilename.apks what ever you want) 
this will create apks file on your directory

### step 6: create convertor.json
 create `convertor.json` in `apk-creator` directory and put this json code in it 
```
{
  "supportedAbis": ["arm64-v8a"],
  "supportedLocales": ["en"],
  "screenDensity": 480,
  "sdkVersion": 28
}
```
### step 7:keystore
 you have to generate keystore for apk release 
run this command on `apk-convertor` directory : 
 
```keytool -genkeypair -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias```
 
it will ask you to create password of 6 cheractors, make it and remember it 
it will ask you couple of more questions just answere them 
this will create `my-realase-key.jks` file 
 


### step 8 : Preper Convertor APKS to APK
on `apk-convertor` directory run: 
 
```
java -jar bundletool.jar build-apks --bundle=myaabname.aab  --output=myapksname.apks --mode=universal --ks=my-release-key.jks --ks-key-alias=my-key-alias --ks-pass=pass:YOUR_KEYPASS --key-pass=pass:YOUR_KEYPASS
```
(change `myapksname.apks`, `myaabname.aab` and YOUR_KEYPASS with file names and password that you made) 

### step 9: Convert APKS to APK
(you might need your exect directory names for this, copy your `apk-convertor` url and rename your this example files with your own file names) 
run:
```
 java -jar D:\apk-convertor\bundletool.jar extract-apks --apks=D:\apk-convertor\ myapksname.apks --device-spec=D:\apk-convertor\convertor.json
```
it will save new apk file in temp folder and give you url where it was saved 

  
The APKs have been extracted in the directory: C:\Users\User\AppData\Local\Temp\bundletool-extracted-apks9726380368889264826

#OR

 you can make new folder named `apk_out` and use this code isntad ( change directorys and file names as above for your own computer) 
after running this new apk file will be saved on `apk_out` folder instad of temp folder 
```
java -jar "F:\gios projects\abb-to-apk-convertor\bundletool.jar" extract-apks --apks="F:\gios projects\abb-to-apk-convertor\MyKeyBox.apks" --device-spec="F:\gios projects\abb-to-apk-convertor\convertor.json" --output-dir="F:\gios projects\abb-to-apk-convertor\apk_out"
```
### step 10: download new created apk file in to your android and install it 


