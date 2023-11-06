# Patient Manager

This innovative application empowers healthcare professionals to seamlessly manage their patients' data and associated notes, leveraging state-of-the-art technologies like React, Redux, Flask, and SQLAlchemy.

## Check out <a href="https://patient-manager.onrender.com/" target="_blank">Patient Manager</a>

## Getting started
1. Clone this repository

2. Install dependencies for the Backend and Frontend in different terminals

      Backend:
      ```bash
      pipenv install -r requirements.txt
      ```
      Frontend:
      ```bash
      cd react-app
      npm i
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. Start the app by utilizing two seperate terminals and run the following:
   Backend:
   ```bash
   flask run 
   ```
   Frontend:
   ```bash
   npm start 
   ```

6. Now you can use the app!
