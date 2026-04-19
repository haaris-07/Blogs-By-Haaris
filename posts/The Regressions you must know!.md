---
title: "The Essentials and The Linear Regression!"
date: "2026-04-20"
excerpt: "My way of explaining linear regression, gradient descent machine learning models"
featured: true
---

# Linear Regression and The Essentials 

We apply linear regression model, if we expect the predicted target value to be a linear combination of input features. <br>
Mathematically linear regression function for the predicted target value can be represented as:<br>
`ŷ(W, X) =W1 + W1X1 +...+ WpXp`<br>
Where Wi = corresponsing weights of feature Xi and Xi = ith input feature
So the above function is basically a linear combination of weights and input features.<br>
Since the expectation of any machine learning model is to output the predicted target value (which would be close to actual target value) based on the provided input values, we are intended to model an algorithm that provides us the best possible equation to achieve this and to achieve this, weights are expected to be updated continuously until the error between actual target value and predicted target value by the equation is minimal or satisfactory.<br>
On what factors could we update weights?<br>
Yes! On the basis of predicted value and actual value. How much they differ by or something similar to that right? <br>
And now that is called an **error**. Based on the error we update the weights. We 
The actual task is in finding the weight updation method. Which we already discussed in "The Essentials" topic of this blog page. If you have gone thorugh that, you will know the answer and yes! it is gradient descent.<br>
