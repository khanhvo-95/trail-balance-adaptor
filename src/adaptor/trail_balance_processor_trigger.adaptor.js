import { Sema } from "async-sema";

class TBAdaptorProcessorTrigger {
    constructor(tbAdaptorProcessor) {
        // Constants
        this.THREAD_COUNT = 5;
    
        // Member variables
        this.semaphore = new Sema(this.THREAD_COUNT);
        this.executorService = [];
        this.tbAdaptorProcessor = tbAdaptorProcessor;
      }
    
      async trigger(message) {
        await this.semaphore.acquire();
        const task = this.tbAdaptorProcessor.process(message);
        this.executorService.push(task);
        await this.isTaskDone();
        this.semaphore.release();
        
        console.log(`All tasks are completed: ${task}`);
        return 'your request is being processed';
      }
    
      async isTaskDone() {
        await Promise.allSettled(this.executorService);
      }
}

export default TBAdaptorProcessorTrigger;