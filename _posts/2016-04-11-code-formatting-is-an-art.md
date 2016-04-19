---
layout: post
title: Code formatting is an art
---

`This blog is for someone special in my life on her special day!`

> Programs must be written for people to read, and only incidentally for machines to execute
>
> *Hal Abelson*

When you're asked to look at someone else's code, myriad developers react [like this.](https://pbs.twimg.com/tweet_video/CafHN8FWEAAIOGA.mp4)

<video id="play-video-on-scroll" width="683" height="384" class="video-js vjs-default-skin" controls preload="auto">
<source src="https://pbs.twimg.com/tweet_video/CafHN8FWEAAIOGA.mp4" type="video/mp4">
</video>

It's very often not every programmer likes the other programmers code unless it's not an ill-formatted code. Ill-fromatted code makes it harder to understand and creates a direct impact on how ugly the code has been implemented. It might look very silly but I myself personally feel a good programmer is one who follows good naming conventions, code formatting and zero typos over being technically sound. I don't know why but formatting and spellings to me is like a big deal than the code doing what it is intended to.

A well formatted code to me is,

* To have good naming convention -  `int inputNumber` as a variable name is more readable than just saying `int a`.

* Enough white space within a code always removes the ugliness. Instruction written like this `x = y + z` looks more neat and clean than `x=y+z`.

* When surrounding the code with `try/catch` block don't just say `e.printStackTrace()`, instead make use of `return` statement if `try/catch` is surround in a method call if not initialize the respective variables. `catch` block is not for printing the stack trace.