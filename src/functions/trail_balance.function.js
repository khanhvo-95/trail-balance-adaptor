import { app } from '@azure/functions';
import TBAdaptorProcessor from '../adaptor/trail_balance_processor.adaptor.js';
import TBAdaptorProcessorTrigger from '../adaptor/trail_balance_processor_trigger.adaptor.js';

async function trailBalance_controller(request, context) {
    context.log(`Http function processed request for url "${request.url}"`);

    const tbAdaptorProcessor = new TBAdaptorProcessor(); 
    const tbAdaptorProcessorTrigger = new TBAdaptorProcessorTrigger(tbAdaptorProcessor);
    const message = request.body;

    const response = await tbAdaptorProcessorTrigger.trigger(message);
    context.res = {
      body: response,
      headers: {
        'Content-Type': 'application/json',
      },
      status: 202
    };
    return { body: `Hello, ${response}!` };
}

app.http('trail_balance', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'file',
    handler: (request, context) => trailBalance_controller(request, context)
});