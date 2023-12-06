import { app } from '@azure/functions';

app.http('store_audit_db', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'audits',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}!` };
    }
});
