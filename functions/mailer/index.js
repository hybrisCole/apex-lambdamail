/* eslint-disable no-console */
const aws = require('aws-sdk');
const ses = new aws.SES({apiVersion : '2012-10-17'});
aws.config.update({
  region          : process.env.sesRegion,
  accessKeyId     : process.env.sesAccessKeyId,
  secretAccessKey : process.env.sesSecretAccessKey,
});

exports.handle = (e, ctx, cb) => {
  ses.sendEmail({
    Source      : e.from,
    Destination : { ToAddresses : e.addresses },
    Message     : {
      Subject : {
        Data : e.subject,
      },
      Body : {
        Html : {
          Data : e.mailTemplate,
        },
      },
    },
  }, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
};

/* const lambda = new aws.Lambda({apiVersion: '2015-03-31'});
const params = {
  FunctionName   : 'sendMail',
  InvocationType : 'Event',
  Payload        : JSON.stringify({
    from      : 'acpii2005@gmail.com',
    addresses : ['acole@18techs.com', 'acpii2005@gmail.com'],
  }),
};
console.log('invoking lambda');
lambda.invoke(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});*/
