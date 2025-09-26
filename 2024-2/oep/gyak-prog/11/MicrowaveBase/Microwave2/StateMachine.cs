//Author:   Gregorics Tibor
//Date:     2023.01.03.
//Title:    class of statemachine

using System.Threading;

namespace StateMachine
{
    public abstract class StateMachine<Signal>
    {
        private readonly Thread thread;
        private readonly MyQueue<Signal> eventQueue;
        private readonly Signal finalSignal;
        public StateMachine(Signal none, Signal final)
        {
            finalSignal = final;
            eventQueue = new MyQueue<Signal>(none);
            thread = new Thread(new ThreadStart(StateMachineProcess));
            thread.Start();
        }
               
        public void Send(Signal signal)
        {
            eventQueue.Enqueue(signal);
        }

        private bool inprocess;
        private void StateMachineProcess()
        {
            inprocess = true;
            while (inprocess)
            {
                try
                {
                    Signal signal = eventQueue.Dequeue();
                    if (signal.Equals(finalSignal)) inprocess = false;
                    else Transition(signal);
                }
                catch (System.InvalidOperationException) { }
            }
        }

        protected abstract void Transition(Signal signal);
    }
}
