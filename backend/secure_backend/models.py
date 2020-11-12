from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    owner = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return str(self.owner_id) + ' : ' + self.content


class Comment(models.Model):
    post_owner = models.ForeignKey(Post, on_delete=models.CASCADE)
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return str(self.commenter) + ' >> ' + self.content