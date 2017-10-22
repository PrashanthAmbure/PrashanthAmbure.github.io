---
layout: post
title: ThreadPoolExecutor
---

`java.lang.OutOfMemoryError: unable to create new native thread`

This error means that JVM can't spawn anymore threads from the OS i.e. Java application has hit the limit of how many threads it can launch. Possibly everyone of us now get these two questions...

* What causes this error?
* When can such situation arise and how to handle?

Consider the below code of snippet,

>	while(true){
	    new Thread(new Runnable(){
        	public void run() {
            	try {
                		Thread.sleep(10000000);
            	} catch(InterruptedException e) { 
            	}        
        	}        	 
	    }).start();
	}
>

This peice of code when executed, after a certain threshold starts complaining  `java.lang.OutOfMemoryError: unable to create new native thread`.

### What is causing it?

Lets now start answering - what caused this error. Firstly, every OS has a threshold on how many threads to create and this is platform dependent. Looking at the code, it's very evident that a new thread is being created and that thread gets suspended for 163 mins (approx.) and because this peice of code lives in a infinite loop, JVM requests OS for a new thread and that thread gets suspended. Based on the OS where this program is getting executed when the OS has exhausted with the available threads and can't spawn any more thread then it terminates the execution of the program with the error. So if the OS where this is being executed has 10000 threads and this peice of code requests OS for a thread beyond 10000.

### Educated scenario to see threads repleting!

Now that we know the cause, lets try to understand when can such situation arise and how should we handle it. Lets assume we have a basic rest web end point or a simple async task job (using SimpleAsyncTaskExecutor) which keeps creating a thread for every request. Assume there are only 1000 threads available and peak load of requests were hit to your web application, in this case it's very viable for this issue to occur.

### How to handle it?

Now that we know the problem deriving the solution becomes challenging. Apparently JDK made this very simpler for us with _**ThreadPoolExecutor**_

ThreadPoolExecutor is a collection of threads in a thread pool. The problem is number of threads getting exhausted, to solve this situation we should create a pool of threads and our application should use only those threads to perform the task - this ensures the OS to not allocate any thread outside of the allocated pool. Let's see this in action...

We will start exploring one of the constructor for ThreadPoolExecutor class which is

>	
	ThreadPoolExecutor(int corePoolSize,
                       int maximumPoolSize,
                       long keepAliveTime,
                       TimeUnit unit,
                       BlockingQueue workQueue ,
                       ThreadFactory threadFactory,
                       RejectedExecutionHandler handler)

**corePoolSize:** corePoolSize is the number of threads to keep in the pool, even if they are idle

**MaximumPoolSize:** the maximum number of threads to allow in the pool

**keepAliveTime:** When you have more threads already available than corePoolSize, then keepAliveTime is time upto which that thread will wait for task before terminating.

**unit:** time unit is for keepAliveTime

**workQueue:** workQueue is the BlockingQueue which holds the tasks before execution.

Example: 

>	
	new ThreadPoolExector(1, 2, 10L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue(4))

Max pool size in ThreadPoolExecutor’s Constructor is 2, so when we submit 10 tasks to thread pool, 2 threads get created and starts processing 2 tasks and 4 tasks get queued in LinkedBlockingQueue, so once LinkedBlockingQueue become full, rest tasks get rejected.

>	
	ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
		executor.setCorePoolSize(1);
		executor.setMaximumPoolSize(5);
		for (int i = 0; i < 10; i++) {
			executor.execute(new MyRunnableThread());
		}

>	
	class MyRunnableThread implements Runnable {
		@Override
		public void run() {
			System.out.println(Thread.currentThread());
		}
	}

