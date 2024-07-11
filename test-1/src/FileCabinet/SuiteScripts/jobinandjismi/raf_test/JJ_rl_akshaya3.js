/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/redirect', 'N/render', 'N/runtime', 'N/ui/message', 'N/file'],
    /**
 * @param{record} record
 * @param{redirect} redirect
 * @param{render} render
  * @param{file} file
 * @param{runtime} runtime
 * @param{message} message
 */
    (record, redirect, render, runtime, message) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            var docNumber = requestParams.id;
            if (!docNumber) {
                throw error.create({
                    name: 'INVALID_REQUEST',
                    message: 'Document number is required'
                });
            }

          
            var entity = Entity(docNumber);
            if (!entity) {
                throw error.create({
                    name: 'ENTITY_NOT_FOUND',
                    message: 'Entity not found for document number ' + docNumber
                });
            }

            // Generate the PDF
            var pdfLink = generatePdf(entity);
            return pdfLink;

            
        }

        function Entity(docNumber) {
            var customRecord = record.load({
                type: record.Type.CUSTOM_RECORD_TYPE,
                id: 'custrecord_jj_course1',
                filters: [
                    ['documentnumber', 'is', docNumber]
                ]
            });
            return customRecord;
        }

        function generatePdf(entity) {
            var pdf = pdf.create();
            pdf.addPage();
            pdf.addText(entity.getValue('fieldname'));
            var file = pdf.saveToFile({
                filename: 'SuiteScripts',
                folder: 1695
            });
            return file.url;
        

    }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {

}

/**
 * Defines the function that is executed when a POST request is sent to a RESTlet.
 * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
 *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
 *     the body must be a valid JSON)
 * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
 *     Object when request Content-Type is 'application/json' or 'application/xml'
 * @since 2015.2
 */
const post = (requestBody) => {




}

/**
 * Defines the function that is executed when a DELETE request is sent to a RESTlet.
 * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
 *     content types)
 * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
 *     Object when request Content-Type is 'application/json' or 'application/xml'
 * @since 2015.2
 */
const doDelete = (requestParams) => {

}

return { get, put, post, delete: doDelete }

    });
