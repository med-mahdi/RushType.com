from django.db import models
from django.contrib.auth.models import User
from loginSystem.models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver




#> Function That Get The Best Score of A Particular User
def get_best_score(fname):
    all_scores = Records.objects.all().filter(username=fname).order_by("-wpm")
    return all_scores[0]




class Records(models.Model):
    username = models.ForeignKey(Profile , on_delete=models.CASCADE)
    wpm = models.IntegerField(default=0,null=True,blank=True)
    cpm = models.IntegerField(default=0,null=True,blank=True)
    time = models.IntegerField(default=0,null=True,blank=True)
    mistake = models.IntegerField(default=0,null=True,blank=True)
    acc = models.IntegerField(default=0,null=True,blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.username)

    




class BestScore(models.Model):
    record = models.OneToOneField(Records,on_delete=models.CASCADE)
    user = models.OneToOneField(Profile,on_delete=models.CASCADE,blank=True,null=True)
    wpm = models.IntegerField(default=0,null=True,blank=True)
    country = models.CharField(max_length=50,null=True,blank=True)
    

    def __str__(self):
        return str(self.record)


    @receiver(post_save , sender=Records)
    def createDefaultScore(sender , instance , created , **kwargs):
        if created:
            ourUser = instance.username
            try:
                userExists = BestScore.objects.get(user=ourUser)
                userExists = True
            except:
                userExists = False

            if userExists == False:
                new_score = BestScore.objects.create(record=instance,user=ourUser,wpm=instance.wpm,country=instance.username.country)
                new_score.save()
                
            if userExists == True:
                userScore = BestScore.objects.get(user=ourUser)
                if int(instance.wpm) > int(userScore.record.wpm):

                    userScore.record = instance
                    userScore.user = ourUser
                    userScore.wpm = instance.wpm
                    userScore.country = instance.username.country

                    userScore.save()
                    print("New Score Updated")
                else:
                    print("New Record Created, is Not The Best Score")

                       




# This Code To Update The Best Score of a Particular User Each Time a record Added
@receiver(post_save , sender=Profile)
def createDefaultScore(sender , instance , created , **kwargs):
    if created:
        record = Records.objects.create(username=instance)
        print("Default Record Was Created")        
