Technologies Used:

  * FrontEnd:
    * Angular 6
    * Google Icons
    * rxjs
    * Bootstrap 4
  * Backend:
    * Django 2.0.0
    * django-cors-headers
    * twilio~=6.0.0


Backend APIs:

* TO Send Message (POST):
    *   /sendMsg/
        *   body: {'number':string, 'msg':string}
        *   response: {'status':string,	'error': string}

* To get Contacts (GET):
    *   /
        *   response: [{'firstName':string, 'lastName': string, 'number': string},{...}]


* To get List of Messages(GET):
    *   /getListOfMsg/
        *   response: [{'to':string, 'name': string, 'date': string, 'time': string, 'otp': string},{...}]


Installation:

* FrontEnd:
    * npm intall
    * vim /path/to/project/OtpApp/src/environments/environment.ts
    * Add Base url of backend
    * ng serve
    * Dependency: npm

* Backend:
    * virtualenv /path/to/project
    * source /path/to/project/bin/activate
    * pip3 install django twilio~=6.0.0 django-cors-headers
    * vim /path/to/project/OtpAppBackend/OtpAppBackend/settings.py
    * Add Base URL to front End in:
    
        <code>
        CORS_ORIGIN_WHITELIST = (
            'base_URL_of_frontEnd',
        )
        </code>
    
    * Add twilio settings:


        <code>
            ACCOUNT_SID = 'Add Account_SID here'
        
            AUTH_TOKEN = 'Add auth_token here'
        
            FROM_NUMBER = 'Add twilo number here'
        </code>

    * python manage.py runserver
    * Dependency: pip3, python3, virtualenv

