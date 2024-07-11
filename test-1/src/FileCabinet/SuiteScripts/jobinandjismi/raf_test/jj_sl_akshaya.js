/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/runtime', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{runtime} runtime
 * @param{serverWidget} serverWidget
 */
    (record, runtime, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {


            if (scriptContext.request.method === 'GET') {
                createForm(scriptContext);

            }
            else {
                handleFormSubmission(scriptContext);
            }

            // Create a form
           
            function createForm(scriptContext) {
                let form = serverWidget.createForm({
                    title: 'course fee queries'
                });
                form.clientScriptFileId = 4310;

                // Add fields to the form
                form.addField({
                    id: 'custpage_customer_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });

                form.addField({
                    id: 'custpage_customer_country',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Country'
                });

                form.addField({
                    id: 'custpage_customer_age',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'AGE'
                });

                form.addField({
                    id: 'custpage_customer_phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'phone'
                });

                form.addField({
                    id: 'custpage_customer_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'
                });


                form.addField({
                    id: 'custpage_customer_language1',
                    label: 'language',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customlist_jj_course1',

                    
                });

                // const freecurrencyapi = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_kP2KtzN9ntAhMDSXDiTQ4JBJf3QOFLWxPTRaMVWT&currencies=EUR%2CUSD%2CCAD&base_currency=INR'



                // //Make a GET request using the Fetch API
                // fetch(freecurrencyapi)
                //     .then(response => {
                //         if (!response.ok) {
                //             throw new Error('Network response was not ok');
                //         }
                //         return response.json();
                //     })
                //     .then(userData => {
                //         // Process the retrieved user data
                //         form.addField({
                //             id: 'custpag_base_currency',
                //             type: serverWidget.FieldType.SELECT,
                //             label: 'base_currency',
                //             source: "base_currency"
                //         });
                //         form.addField({
                //             id: 'custpag_transaction_currency',
                //             type: serverWidget.FieldType.SELECT,
                //             label: 'transaction_currency',
                //             source: "Currencies"
                //         });


                //     })
                //     .catch(error => {
                //         console.error('Error:', error);
                //     });

                
       

                // form.addField({
                //     id: 'custpage_fee_amount',
                //     type: serverWidget.FieldType.INTEGER,
                //     label: 'fee_amount',
                //     value : "custrecord_jj_fee"
                 
                // });


                form.addField({
                    id: 'custpage_exchange_rate',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'exchange_rate'
                });



                // Add a submit button
                form.addSubmitButton({
                    label: 'Submit'
                });

                // Render the form
                scriptContext.response.writePage(form);

            }
            function handleFormSubmission(scriptContext) {
                let request = scriptContext.request;
                let Name = request.parameters.custpage_customer_name;
                let Country = request.parameters.custpage_customer_country;
                let Age = request.parameters.custpage_customer_age;
                let Phone = request.parameters.custpage_customer_phone;
                let Email = request.parameters.custpage_customer_email;
                let language = request.parameters.custpage_customer_language1;
                let base_currency = request.parameters.custpag_base_currency;
                let transaction_currency = request.parameters.custpag_transaction_currency;
                let fee_amount = request.parameters.custpage_fee_amount;
                let exchange_rate = request.parameters.custpage_exchange_rate;

                let newRecord = record.create({
                    type: 'customrecord_jj_akshays_institute',
                    isDynamic: true
                });

                newRecord.setValue('custrecord_jj_name1', Name);
                newRecord.setValue('custrecord_jj_country1', Country);
                newRecord.setValue('custrecord_jj_age1', Age);
                newRecord.setValue('custrecord_jj_phone1', Phone);
                newRecord.setValue('custrecord_jj_email1', Email);


                newRecord.setValue('custrecord_jj_language1', language);
                newRecord.setValue('custrecord_jj_bcurrency1', base_currency);
                newRecord.setValue('custrecord_jj_transaction1', transaction_currency);
                newRecord.setValue('custrecord_jj_feeamount1', fee_amount);
                newRecord.setValue('custrecord_jj_erate1', exchange_rate);

                newRecord.save();

                log.debug({
                    title: ' Record Created',
                });
            }

        }

        return { onRequest }

    });
