/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/action', 'N/record', 'N/log', 'N/workflow', 'N/runtime'],
    /**
 * @param{action} action
 * @param{record} record
  * @param{log} log
 * @param{workflow} workflow
 * @param{runtime} runtime

 */
    (action, record, log, workflow, runtime) => {
        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        const onAction = (scriptContext) => {
            try {
                let rec = scriptContext.newRecord;
                let linecount = rec.getLineCount({
                    sublistId: 'item'
                })
                for (let i = 0; i < linecount; i++) {
                    let quantity = rec.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        line: i
                    })
                    log.debug(quantity);
                    if (quantity > 20) {
                        return 0;
                    }
                }
            }
            catch (e) {
                log.debug(e.message)
            }

        }

        return { onAction };
    });
