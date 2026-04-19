---
title: "The Regressions one must know!"
date: "2026-04-20"
excerpt: "My way of explaining regression machine learning models"
featured: true
---

# Linear Regression

Let's take a dumb example:
Imagine we have the worst businessman who went out of business due to bad sales. By going through his sales data We found relationship between price and quantity of ice creams sold. His ice-cream just tasted like everyone else's ice-cream. So he reduced his prices and so the no.of ice-creams sold per day increased. He continued reducing prices further more and even at loss prices i.e; his selling price is less than his cost price. So one day he is out of business. But we got the data required, to perform linear regression. 
<img src="../lib/images/icecream_sales_linreg.png">

We apply linear regression model, if we expect the predicted target value to be a linear combination of input features. <br>
Mathematically linear regression function for the predicted target value can be represented as:<br>
`ŷ(W, X) =W1 + W1X1 +...+ WpXp`<br>
Where Wi = corresponsing weights of feature Xi and Xi = ith input feature
So the above function is basically a linear combination of weights and input features.<br>
Since the expectation of any machine learning model is to output the predicted target value (which would be close to actual target value) based on the provided input values. So we need to model an equation to achieve this, where weights are expected to be updated continuously until the error between actual target value and predicted target value is minimal or satisfactory.<br>
