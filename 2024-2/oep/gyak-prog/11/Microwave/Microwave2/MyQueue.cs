//Author:   Gregorics Tibor
//Date:     2023.01.03.
//Title:    class of threadsafe queues

using System.Collections.Generic;
using System.Threading;

namespace StateMachine
{
	class MyQueue <Signal>
	{
		private readonly Signal noneSignal;
		public MyQueue(Signal none)
        {
			noneSignal = none;
        }

		private readonly Queue<Signal> queue = new ();

		private readonly object criticalSection = new ();

		public bool Empty()
		{
			return queue.Count == 0;
		}

		public void Enqueue(Signal e)
		{
			Monitor.Enter(criticalSection);
			queue.Enqueue(e);
			Monitor.Exit(criticalSection);
		}
		public Signal Dequeue()
		{
			Signal e;
			Monitor.Enter(criticalSection);
			if (!Empty())
			{
				e = queue.Peek();
				queue.Dequeue();
			}
			else e = noneSignal;
			Monitor.Exit(criticalSection);
			return e;
		}
	}
}

