# Encapsulation

## Reusable components

> Do you build applications on top of reusable components?

? Do you build your applications on top of web frameworks, ORM, error handling library, caching system, dependency injection container, or anything you didn't build yourself?

You should, you can stand on the shoulders of giants and use components that other people have already built.

> Do you regularly look at the **source code** of those components? Do you spend a regular amount of your daily work time looking at those components?

You are able to work with those components without learning all of the nitty-gritty implementation details.

That's what ecapsulation is about: writing code that is reusable without having to understand everything about how it works.

## Most code sucks

Write code for stupid programmers.

An example of code that sucks:

``` C#
public class FileStore
{
    public string WorkingDirectory{ get; set; }

    public string Save(int id, string message);

    public event EventHandler<MessageEventArgs> MessageRead;

    public void Read(int id);
}
```

What does this code actually do? What do the members do?

For example, why does `Save` return a string? What does the string contain? If there's no documentation, most look at the source code:

``` C#
public string Save(int id, string message)
{
    var path = Path.Combine(this.WorkingDirectory, id + ".txt");
    File.WriteAllText(path, message);
    return path;
}
```

May seem like not a big deal, but if we imagine this method called other methods and did more, it would eat up a lot of time having to do this on a regular basis.

What about the `Read` method? Why does it return `void`?

We can maybe guess that the `MessageRead` event is associated with the `Read` method and we can get the message from the event handler.

``` C#
public void Read(int id)
{
    var path = Path.combine(this.WorkingDirectory, id + ".txt");
    var msg = File.ReadAllText(path);
    this.MessageRead(this, new MessageEventArgs { Message = msg });
}
```

Once again, we have to read the source code to understand how this works.

This is a problem.

## Why do we care?

Most of the time it isn't enough to tell a manager the codebase is "hard to work with". All you're gonna here is, "We don't have time for this--go make more features."

So really the question is "why should anyone else in the company care that you don't like working with the sucky code?"

Sucky code has a negative impact on *long-term productivity*. It becomes more and more difficult to add new features when a few developers fill the codebase with spaghetti, which can happen in only a few weeks.

*Maintainability* also suffers. Continuing to work with that spaghetti code is a nightmare.

One of the reasons is **code is _read_ way more often than it is _written_**.

We have a responsibility to write code that is readable and understandable for our colleagues and our future self. Nobody will likely have the understanding we have while we are building that feature.

## Classic OO definition

Has two traits:
* Information hiding (implementation hiding)
* Protection of invariants

Protection of invariants involves making sure invalid states are impossible on classes. This can be done sometimes by checking pre and post conditions (assertions).

## Beyond OO

We can reach beyond OO for some actionable steps.

* CQS (Command Query Separation)
* Postel's Law

### Command Query Separation

Your operations should be commands or queries, but not both.

Also known as CQS, which is not CQRS. CQRS is an architectural design pattern.

Commands - have observable side-effects

Queries - returns data

CQS is a principle because it is very possible to not follow it. Even though you can get away with it, you shouldn't.

## Commands & Queries

### Commands

Mutates state

Examples:
``` C#
void Save(Order order);

void Send(T message);

void Associate(IFoo foo, Bar bar);
```

What do they all have in common? *They return `void`*.

You don't call a method that returns void unless you expect it to have a side-effect. That makes it easy to recognize commands.

### Queries

* Do not mutate
* Has an observable state
* Idempotent - the state won't change whether you invoke once or `n` times
* Safe to invoke

Examples:
``` C#
Order[] GetOrders(int userId);

IFoo Map(Bar bar);

T Create();
```

What do these all have in common? *They return **something***.

If you adhere to CQS, you know that, if a method returns something, it must be a query.

## Queries

Let's look at the early example of our `FileStore` class fully expanded:

``` C#
public class FileStore
{
    public string WorkingDirectory { get; set; }

    public string Save(int id, string message)
    {
        var path = Path.Combine(this.WorkingDirectory, id + ".txt");
        File.WriteAllText(path, message);
        return path;
    }

    public event EventHandler<MessageEventArgs> MessageRead;

    public void Read(int id)
    {
        var path = Path.Combine(this.WorkingDirectory, id + ".txt");
        var msg = File.ReadAllText(path);
        this.MessageRead(this, nhew MessageEventArgs { Message = msg });
    }
}
```

The code above sucks because we can't easily look at this and tell which are commands and which are queries.

The `Read` method should be a query, so let's make it one:

``` C#
public string Read(int id)
{
    var path = Path.Combine(this.WorkingDirectory, id + ".txt");
    var msg = File.ReadAllText(path);
    this.MessageRead(this, nhew MessageEventArgs { Message = msg });
    return msg;
}
```

But is it a side-effect free query? This method raises an event, and an event is a side-effect. So let's remove that:

``` C#
public string Read(int id)
{
    var path = Path.Combine(this.WorkingDirectory, id + ".txt");
    var msg = File.ReadAllText(path);
    return msg;
}
```

This means we can get rid of the event from the class completely.

## Commands

Here is our partially cleaned up class:

``` C#
public class FileStore
{
    public string WorkingDirectory { get; set; }

    public string Save(int id, string message)
    {
        var path = Path.Combine(this.WorkingDirectory, id + ".txt");
        File.WriteAllText(path, message);
        return path;
    }

    public string Read(int id)
    {
        var path = Path.Combine(this.WorkingDirectory, id + ".txt");
        var msg = File.ReadAllText(path);
        return msg;
    }
}
```

Where is the command in this class? Some would say `Save`, but it returns `string`. It doesn't adhere to the CQS principle. If we want to reduce the amount of code we need to read through all the time, we need to turn it into a proper command. Otherwise, what this method does is not clear based on looking at it, and we must read it's code so we can be sure it's what we want.

We can't simply remove the returning of the `path` variable and call it a day because it may be needed. Instead we should split the two things `Save` is doing into two methods.

Then we can clean out the duplicate code that our new method `GetFileName` overlaps with.

``` C#
public class FileStore
{
    public string WorkingDirectory { get; set; }

    public void Save(int id, string message)
    {
        File.WriteAllText(this.GetFileName(id), message);
    }

    public string Read(int id)
    {
        return File.ReadAllText(this.GetFileName(id));
    }

    public string GetFileName(int id)
    {
        return Path.Combine(this.WorkingDirectory, id + ".txt");
    }
}
```

It is okay to query from a command, like we are now doing in the `Save` method with `GetFileName` because the query does not have a side-effect.

Now we can look at our method signatures to determine what the method does (command vs query). As we use this in our codebase, we will learn to trust the codebase more and find it unnecessary to read through all of the implementation code.

## Postel's Law

The robustness principle

Originally stated in the context of designing network protocols.

> Be conservative in what you send, but be liberal in what you accept.