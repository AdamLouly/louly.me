---
date: 2019-03-23
title: "NLP Based Recommender System Without User Preferences"
categories: ["Machine Learning", "NLP","Recommendation System","Python","Content-Based"]
published: true
keywords: ["Machine Learning", "NLP","Recommendation System","Python","Content-Based"]
banner: "./banner.jpg"
---


**Recommender systems** (RS) have evolved into a fundamental tool for helping users make informed decisions and choices, especially in the era of big data in which customers have to make choices from a large number of products and services. A lot of RS models and techniques have been proposed and most of them have achieved great success. Among them, the content-based RS and collaborative filtering RS are two representative ones. Their efficacy has been demonstrated by both research and industry communities.

We will be building a content-based recommender system based on a natural language processing approach, This approach is very useful when we are dealing with products that are featured by a description or a title (text data in general), like news, jobs, books etc ..

Let’s Start!
## The Data

We will be using a dataset of projects from some freelancing websites, that were parsed from RSS feed for educational purposes only.

we will try to recommend interesting projects to the freelancers based on the projects that they have done previously.


    import pandas as pd
    projects = pd.read_csv("projects.csv")
    projects_done= pd.read_csv("projects_done_by_users_history.csv")
    projects.head()

![Dateframe of projects](https://cdn-images-1.medium.com/max/2402/1*lMn1ej5qhjoykwzBzf3YAA.png)

The projects done history table comprises 2 rows, user_id and project_id.

Now let’s prepare the data and clean it.

    projects = projects.drop_duplicates(subset="Title", keep='first', inplace=False)
    projects["Category"] = projects["Category"].fillna('')
    projects["Description"] = projects["Description"].fillna('')
    projects["SubCategory"] = projects["SubCategory"].fillna('')
    projects['Title']= projects['Title'].fillna('')

Let's combine the whole rows as one row for each document


    projects["text"] = projects["Category"] + projects["Description"] + projects["SubCategory"] + projects["Title"]

Now we will calculate **TF-IDF** “Term Frequency — Inverse Data Frequency”

    from sklearn.feature_extraction.text import TfidfVectorizer

    tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english')
    tfidf_matrix = tf.fit_transform(projects['text'])

Its time to generate the cosine sim matrix

    from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

Now we’re done, our freelancers are free for open projects .. let’s recommend some interesting projects for them :))

getUserDone function will return a list that contains all the ids of done projects by the user.

get_recommendations will return a list with top similar projects to the projects done by a specific user, the list will be sorted ascending.
    titles = projects['Title']
    indices = pd.Series(projects.index, index=projects['Title'])

    def getUserDone(user_id):
        ProjectsDone = projects_done[users_done['userid'] == user_id]
        print(ProjectsDone["projectid"])
        return ProjectsDone["projectid"].values.tolist()

    def get_recommendations(user_id):
        id = getUserDone(user_id)
        sim_scores = []
        for idx in id:
            sim_scores = sim_scores + list(enumerate(cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            project_indices = [i[0] for i in sim_scores]
        return titles.iloc[project_indices][len(id):]


Let's recommend top 25 projects that user with id 20 may be interested on.

    get_recommendations(20).head(25)

![Top 25 Recommendations](https://cdn-images-1.medium.com/max/2000/1*ItlYlAV2OhcM-yl34L3r2A.png)

## Conclusion

In this article, we have built a content-based recommender using an NLP approach that is very useful when it comes to products with text data.

Without the need for users preferences, we can recommend for them quality recommendations, just from their completed projects.

This approach is also having pros, that's why it is always recommended to use multiple approaches, and combine them for accurate results.
