# HydroLearn CKEditor 5 Build
    Author: CRivet
    Created: January 15, 2019
    Description:
        This package custom build of CKEditor 5 was developed for use in the HydroLearn
        application for generating content used in learning modules.

        project was initially developed utilizing ckeditor's guide located here:
            https://ckeditor.com/docs/ckeditor5/latest/framework/guides/quick-start.html



## Initial Setup and Running the Sample Project

1.  Create a directory on your system to house your copy of the project, and checkout/download the project. 
        
    > NOTE: This initial download will not contain the following:
    > - build dependancies handled by `node.js / npm`
    > - a distribution of the project
    >
    >
    > you will need to run through the following initialization steps and build the project prior to running the sample site

1.  If your system doesn't already have it installed, install
    **node.js** which should include **npm**.    
    > *Installation steps may vary depending on your system and OS environment.*        
    Additionally, you may need to restart your system for new path variables to take effect.

1.  Ensure you have access to both node & npm by running the following commands
    in cmd/terminal window:
        
        node -v
        npm -v
        
    if version numbers are output everything should be good, otherwise you
    may need to modify your system variables to have access.
        
    > *Note: All of the following steps assume you are running them via the terminal/CMD within the root directory of the project.*
    > so this step is essential for running the following commands.

1.  On first run you will need to install the dependencies listed in `package.json`.
    To do this, navigate to the project directory (containing `package.json`)
    using your terminal/cmd
    and run the following command which will install all listed dependencies:
    
        npm install

Let this process finish and assuming everything installed properly you should now be able to move on to building the project.


## Building The Project
Included in the package.json file are three defined scripts for bundling the
editor into a distribution. Each of these are set to output the generated javascript
bundle to the `public/dist/` directory.  (this allows compiled bundles to be made available for the sample site defined in 'index.js')

### Build Options
- __build__ - performs a single build of the plugin

- __auto-build__ - background process that automatically rebuilds the plugin if any of the required files are modified.

- __publish__ - generates a minified build of the plugin 
        
    > NOTE: *PUBLISH is the method to be used when generating an exportable version of the plugin,
    for use in the main application*

These scripts can be run using the following command from the terminal,
replacing 'OPTION' with one of the above defined script names:

    npm run OPTION

After running one of the build commands you should now have a newly generated javascript package in the `public/dist` directory.
once this has been generated you should now be able to run the sample site.

If at any point you modify the source code in `ck-config.js` or any of the imported modules
in the `custom_plugins/` directory you will need to rebuild the project before 
changes to the editor will take effect. 


## Running the sample

1.  After running through the above configuration steps the sample site should now be functional. To spin up the server, use your
    terminal/cmd window to navigate to the project directory, and run the following command:
    
        nodemon app
    
    this will spin up a server on `localhost:4000` running the application.
    nodemon is an included dev package which will handle restarting the server if any files are changed.

