// Include prompt module.
var prompt = require('prompt');

// This json object is used to configure what data will be retrieved from command line.
var prompt_attributes = [
    {
        // The first input text is assigned to agemen variable.
        message: "When was the age of your first menstrual period? (0) ≥14, (1) 12-13, (2) <12: ",
        name: 'agemen',
        // The agemen must match below regular expression.
        validator: /^[0|1|2]+$/,
        // If agemen is not valid then prompt below message.
        warning: 'Input was not one of the available choices (0, 1, or 2)'
    },
    {
        // The second input text is assigned to agecat variable.
        message: "What is your age? (0) <50, (1) ≥50: ",
        name: 'agecat',
        // The agecat must match below regular expression.
        validator: /^[0|1]+$/,
        // If agecat is not valid then prompt below message.
        warning: 'Input was not one of the available choices (0 or 1)'
    },
    {
        // The third input text is assigned to nbiops variable.
        message: "How many previous breast biopsies have you had? (0) 0, (1) 1, (2) ≥2: ",
        name: 'nbiops',
        // The nbiops must match below regular expression.
        validator: /^[0|1|2]+$/,
        // If nbiops is not valid then prompt below message.
        warning: 'Input was not one of the available choices (0, 1, or 2)'
    },
    {
        // The forth input text is assigned to ageflb variable.
        message: "What was your age at your first live birth? (0) <20, (1) 20-24, (2) 25-29 or never, (3) ≥30: ",
        name: 'ageflb',
        // The ageflb must match below regular expression.
        validator: /^[0|1|2|3]+$/,
        // If ageflb is not valid then prompt below message.
        warning: 'Input was not one of the available choices (0, 1, 2, or 3)'
    },
    {
        // The fifth input text is assigned to numrel variable.
        message: "How many first-degree relatives do you have with breast cancer? (0) 0, (1) 1, (2) ≥2: ",
        name: 'numrel',
        // The numrel must match below regular expression.
        validator: /^[0|1|2]+$/,
        // If numrel is not valid then prompt below message.
        warning: 'Input was not one of the available choices (0, 1, or 2)'
    }
];

// Start the prompt to read user input.
prompt.start();

// Prompt and get user input then display those data in console.
prompt.get(prompt_attributes, function (err, result) {
    if (err) {
        console.log(err);
        return 1;
    }else {
        console.log('Gail Model for Breast Cancer Risk:');

        // Get user input from result object.
        var agemen = result.agemen;
        var agecat = result.agecat;
        var nbiops = result.nbiops;
        var ageflb = result.ageflb;
        var numrel = result.numrel;

        var first;
        var second;
        var third;

        if(agemen==0){first=1
        } else if (agemen==1) {first=1.099
        } else if (agemen==2) {first=1.207};

        if (nbiops==0){
          second=1
        } else if (nbiops==1) {
          if (agecat==0) {second=1.698
          } else if (agecat==1) {second=1.273}
        } else if (nbiops==2) {
          if (agecat==0) {second=2.882
          } else if (agecat==1) {second=1.620}
        };

        if (ageflb==0) {
          if (numrel==0) {third=1
          } else if (numrel==1) {third=2.607
          } else if (numrel==2) {third=6.798}
        } else if (ageflb==1) {
          if (numrel==0) {third=1.244
          } else if (numrel==1) {third=2.681
          } else if (numrel==2) {third=5.775}
        } else if (ageflb==2) {
          if (numrel==0) {third=1.548
          } else if (numrel==1) {third=2.756
          } else if (numrel==2) {third=4.907}
        } else if (ageflb==3) {
          if (numrel==0) {third=1.927
          } else if (numrel==1) {third=2.834
          } else if (numrel==2) {third=4.169}
        };

        var relrisk= Number(Math.round((first*second*third)+'e2')+'e-2');

        var message = "Your relative risk for breast cancer is " + relrisk + "%, compared to an individual of the same age without any risk factors.";

        // Display user input in console log.
        console.log(message);
    }
});
