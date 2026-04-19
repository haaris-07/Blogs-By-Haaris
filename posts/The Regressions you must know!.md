---
title: "The Essentials and The Linear Regression!"
date: "2026-04-20"
excerpt: "My way of explaining linear regression, gradient descent machine learning models"
featured: true
---

# Linear Regression and The Essentials 

We apply linear regression model, if we expect the predicted target value to be a linear combination of input features. <br>
In simple terms if we so
Mathematically linear regression function for the predicted target value can be represented as:<br>
`ŷ(W, X) =W1 + W1X1 +...+ WpXp`<br>
Where Wi = corresponsing weights of feature Xi and Xi = ith input feature
So the above function is basically a linear combination of weights and input features.<br>
Since the expectation of any machine learning model is to output the predicted target value (which would be close to actual target value) based on the provided input values, we are intended to model an algorithm that provides us the best possible equation to achieve this and to achieve this, weights are expected to be updated continuously until the error between actual target value and predicted target value by the equation is minimal or satisfactory.<br>
On what factors could we update weights?<br>
Yes! On the basis of predicted value and actual value. How much they differ by or something similar to that right? <br>
And now that is called an **error** and to be more precise it is the **loss function** (cause error only tells the difference between actual and predicted). Based on this, we update the weights. Does a simple subtraction works? let's try:<br>
We will be having both positive and negative kind of errors, so when we calculate the summation of errors to update the weights, we might end up with a zero or some other numer which doesn't indicate the individual error's contibution.
`10+(-10)+5+(-5)+1+(-1)=0`
So even if we add the errors with a modulus operator, the penality for large errors like 10 would be same as for the small errors like 1 which doesn't sound right. Cause the penalty for large errors should be different from that of small so that updation of weights can be done accordingly. So we finally came up with a solution **mean squared error**. Even the one's with larger penalty is satisfied and the summation doesn't turn out to be zero:
`10^2+(-10)^2+5+(-5)^2+1^2+(-1)^2/6`<br>
yes this will be our new error. So now we are ready with our error but what about weight updation?<br>
The actual task is in finding the weight updation method. So here comes our Gradient Descent algorithm to the rescue!<br>
## Gradient Descent
This algorithm uses the loss function and updates the weights. Let's get the idea of the intuition first before revealing the G.D function.
Weights should take place in such a direction that the loss function is minimized. So to get this happen, we need to add or subtract some term w.r.t weights and that term should also make sure we are going in the right direction at right pace. Some change in loss function with respect to change in weights could give us some sense of direction and multiplying somme constant to this could give us the pace right? So with all this combined few great minds came up with this gradient descent equation.
