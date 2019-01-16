- Author: Cary Rivet
- Created: January 15, 2019
- Description:

    This package custom build of CKEditor 5 was developed for use in the HydroLearn
    application for generating content used in learning modules.

    project was initially developed following guide from the following link:
    	https://ckeditor.com/docs/ckeditor5/latest/framework/guides/quick-start.html



***Initial Setup and Running the Sample Project***
_____


1.  Create a directory on your system to house your copy of the project, and download the project.

-   If your system doesn't already have it installed, install
    **node.js** which should include **npm**.    
    *Installation steps may vary depending on your system and OS environment.*        
    Additionally, you may need to restart your system for new path variables to take effect.

-   ensure you have access to both node & npm by running the following commands
    in cmd/terminal window:
        node -v
        npm -v

    if version numbers are output everything should be good, otherwise you
    may need to modify your system variables to have access.

    *Note: all of the following steps assume you are running them via the terminal/CMD within the root directory of the project*

-   on first run you will need to install the dependencies listed in package.json
    to do this navigate to the project directory (containing 'package.json')
    and run the following command which will install all listed dependencies:

        npm install

-  assuming everything installed correctly, you should now be able to run the
    project using the following command
    (nodemon should have been installed in the previous command):
        nodemon app
    this will spin up a server on `localhost:4000` running the application.
    nodemon will handle restarting the server if any files are changed.

-   If you modify the source code for 'ck-config.js' or any of the imported modules
    in the 'custom_plugins/' directory you will need to rebuild the project.
    before changes to the editor will take effect.  to do this you have some
    options.

***Building The Project***

Included in the package.json file are three defined scripts for bundling the
editor into a distribution. Each of these are set to output the generated javascript
bundle to the `public/dist/` directory.  (this allows compiled bundles to be made available for the sample site defined in 'index.js')

OPTIONS:
- build - performs a single build of the plugin

- autobuild - background process that automatically rebuilds the plugin if any of the required files are modified.

- publish - generates a minified build of the plugin (output to 'public/dist/')
        NOTE: *PUBLISH is method is to be used to generate an exportable version of the plugin,
        for use in the main application*

these scripts can be run using the following command from the terminal,
replacing 'OPTION' with one of the above defined scripts:

    npm run OPTION
