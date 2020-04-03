---
date: 2019-11-04
title: "Create and deploy an Image Classifier using fastai and Render in 15 mins."
categories: ["Machine Learning", "Transfer Learning","Deep Learning","Python","Computer Vision"]
published: true
keywords: ["Machine Learning", "Transfer Learning","Deep Learning","Python","Computer Vision"]
banner: "./banner-fast.jpg"
---

## Create and deploy an Image Classifier using fastai and Render in 15 mins.


When I first started learning Machine Learning and deep learning, It took me forever to learn how to build an image classifier, I took all machine learning courses, learned pandas, numpy and sklearn, and then I realized that using that, I still can not create an Image classifier, so I had to learn Deep learning , CNN and keras framework, all of this was just to create a normal CNN image classifier.

But now in 2019, to create an image classifier, all you need to learn is Fastai, with less than 6 lines of code, you can create a ready to deploy Image classification model that beats most of SOTA paper’s results.

![](https://cdn-images-1.medium.com/max/2400/0*UdvrVN9dAU9YiqtR.jpeg)

**Fastai** is the first deep learning library to provide a single consistent interface to all the most commonly used deep learning applications for vision, text, tabular data, time series, and collaborative filtering.

Until now everything is good! We now can use fastai to build an image classifier.

But wait, will the model stay in console? like I’ll always need to use jupyter notebook to make predictions of new images?
How can I deploy the model to be accessible from the web?

Render have the answer.

![](https://cdn-images-1.medium.com/max/3212/0*5VOZGdG2EofcwMdG.png)

Render is a unified platform to build and run all your apps and websites with free SSL, a global CDN, private networks and auto deploys from Git.

All you need is to save your model after training, and add it to a template provided by Render, (can be cloned from github), and your model is deployed.

example : [https://catdogfastai.onrender.com/](https://catdogfastai.onrender.com/)

Today I’m gonna show you how to create and train a model using fast ai to classify cats vs dogs images and then how to deploy that in a website using render.

Let’s get Started!

First of all you have to prepare a dataset, get some cats and dogs images from google and put them in separated folders, name the first one cats and the second one dogs.

![](https://cdn-images-1.medium.com/max/2000/1*FdBxP2lG1H0CgKoFTDI5hg.png)

Now let’s open our jupyter notebook , or our python script, (whatever floats your boat).

The first thing before start coding you have to install PyTorch and fastai,

You can install them using :

    if you are using anaconda:

    conda install -c pytorch pytorch-cpu torchvision
    conda install -c fastai fastaiorpip install 

    or

    pip install http://download.pytorch.org/whl/cpu/torch-1.0.0-cp36-cp36m-linux_x86_64.whl
    pip install fastai

Now after installing the required libraries, let’s get started.

First we have to import fastai.

    from fastai.vision import *

If you are a software engineer, you might notice that we have imported * (all) from the fastai.vision, which is against the good software engineering practices.
That’s totally right, but in the data science field, when we’re building models, the most important thing is to interact with the things as fast as possible, and when it comes to taking the model into production, then you can import just whatever you need from the mother library.

Cool! now we have to import data.

    path="/images/"

    np.random.seed(42)

    data = ImageDataBunch.from_folder(path+'.', train=path+'.',valid_pct=0.2,ds_tfms=get_transforms(), size=224,num_workers=4).normalize(imagenet_stats)

we have used ImageDataBunch Class to import the images.

This is one of the strongest features on fastai, this class can automatically handle a lot of things without any configuration.

valid_pct refers to the percentage of the validation data during the training, when applying cross validation.

we assigned a size of 244 to all images, and 4 CPU workers.

The normalize function at the end is made to normalize all images, since our deep learning model can be fitted well if the mean of all the images is 0 and the standard deviation is 1. (no need to go deeper on that)

Let’s check our classes now :

    data.classes

Out[5]: [‘cats’, ‘dogs’]

Fantastic, now our data is imported, the classes are assigned ( cats and dogs ).

Let’s check our dataBunch object.

    data.show_batch(rows=3, figsize=(7, 8))

![](https://cdn-images-1.medium.com/max/2000/1*NXoDb22rQ6Sm-oEdNMWD_A.png)

Our data looks like it was imported properly.

Now let’s create our model.
In this example, we gonna use Resnet34 which is a Residual NN.

A residual neural network is an artificial neural network of a kind that builds on constructs known from pyramidal cells in the cerebral cortex. Residual neural networks do this by utilizing skip connections, or short-cuts to jump over some layers.

ResNet managed to beat a lot of Paper’s SOTA Results in image classification, so it is good enough to use it in our problem.

If you don’t get what is ResNet, you don’t have to worry about it.

    from fastai.metrics import error_rate
    learn = cnn_learner(data, models.resnet34, metrics=error_rate,model_dir="/tmp/model/")

we create our learner this way, cnn_learner, we assigned error_rate as a metric to calculate the accuracy.

and we added models.resnet34 as an architecture, which is provided by fastai.

If it is the first time to use this architecture it gonna be downloaded when you run this code snippet.

Alright, Now we created our model.

Let’s train it !!

    defaults.device = torch.device('cuda') *# makes sure the gpu is used*
    learn.fit_one_cycle(4)

![Training results](https://cdn-images-1.medium.com/max/2000/1*aIWgsdIDKQBUbxOEVG6wkg.png)

The error rate of the last epoch was 0.15 which means that our model managed to classify 85% of the images right, noting that some images in the dataset are black images or random noisy images.

Cool, Actually I am satisfied with this accuracy, if you’re not, add some epochs.

now let’s save the model so we can deploy it later in the web.

    learn.save("model")

Alright now we have done training and saving our model.

Let’s deploy it now.

First you gonna go to : [https://github.com/render-examples/fastai-v3](https://github.com/render-examples/fastai-v3)
and generate a new repository out of this one.

Now you have to create a free account in Render : [https://render.com/register](https://render.com/register)

Upload the model that you saved somewhere , eg : [DropBox](https://www.dropbox.com/)

Now go back to your repository in github, >server.py

![](https://cdn-images-1.medium.com/max/2000/1*aarl5rmt9qFgnXKt3MBzzQ.png)

Change the file url with your url, and filename with the file name.

Also don’t forget to change classes to [‘cat’,’dog’], or whatever classes you have.

Save your code in github ( you don’t even need to clone it in your pc )

Now go to Render [Dashboard](https://dashboard.render.com/services) Services

![](https://cdn-images-1.medium.com/max/2000/1*dZiZerMMcTIS4OeSixJ3bA.png)

Click on New Web Service

It gonna ask you to give authorization to github, after doing that, a list of all your repositories will show up.

click on the one you cloned before.

![](https://cdn-images-1.medium.com/max/2998/1*yPY4Xf_MLPmVt60J7Fjm9w.png)

Add a name for your application, ignore the payment part and click on create Web Service.

You gonna wait a bit for the app to be built and deployed then you can check it out from the link : yourappname.onrender.com

Here a small demo :

![](https://cdn-images-1.medium.com/max/2362/1*O_aFsPX0STa1nWfZd1wDvQ.gif)

## Conclusion

We have made an image classifier using fastai and we deployed it using Render.
And that was quick as whip.

If you have any questions, recommendations or critiques, I can be reached via Twitter : @[loulyadam](https://twitter.com/LoulyAdam)

You can find the code source here : [https://github.com/AdamLouly/CatDogRender](https://github.com/AdamLouly/CatDogRender)

you can find the cats and dogs data set here at this [LINK](https://www.kaggle.com/adamlouly/fastaaiclassifier).
