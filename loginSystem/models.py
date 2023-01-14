from .packages import *
import requests
import json
from .models import *
import requests



class Profile(models.Model):
    user = models.OneToOneField(User,blank=False, null=False , on_delete=models.CASCADE)
    city = models.CharField(max_length=100,null=True,blank=True)
    country = models.CharField(max_length=50,null=True,blank=True)
    positon_x = models.CharField(max_length=50,null=True,blank=True)
    positon_y = models.CharField(max_length=50,null=True,blank=True)
    profile_img = models.URLField(max_length=100)
    flagCountry = models.URLField(max_length=100)


    def __str__(self):
        return str(self.user)


    def getImage(self):
        username = self.user
        url = "https://avatars.dicebear.com/api/adventurer/"+str(username)+".png"
        
        request = requests.get(url)
        if request.status_code == 200:
            return url


    def getIpAddresse(self):
        request = requests.get("https://api.ipify.org/?format=json")
        ipJson = request.text
        data = json.loads(ipJson)
        return data['ip']


    def getCityInfo(self):
        ip = self.getIpAddresse()
        request = requests.get("https://ipinfo.io/"+ip+"/geo")
        dataJson = request.text
        data = json.loads(dataJson)
        return data['city']


    def getCountry(self):
        ip = self.getIpAddresse()
        request = requests.get("https://ipinfo.io/"+ip+"/geo")
        dataJson = request.text
        data = json.loads(dataJson) 
        return data['country']


    def getFlagCountry(self):
        country = self.country
        flag = "https://countryflagsapi.com/png/"+country
        return flag




    @receiver(post_save , sender=User)
    def createProfile(sender , instance , created , **kwargs):
        if created:
            userProfile = Profile.objects.create(user=instance)  
            userProfile.city = userProfile.getCityInfo()
            userProfile.country = userProfile.getCountry()
            userProfile.profile_img = userProfile.getImage()
            userProfile.flagCountry = userProfile.getFlagCountry()
            userProfile.save()
            print("Profile was Created")








class Messages(models.Model):
    email = models.EmailField(max_length=200 , null=False , blank=False)
    message = models.TextField(max_length=1000 , null=False , blank=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email





class viewsTraffic(models.Model):
    pageName = models.CharField(max_length=50,null=True,blank=True)

    def __str__(self):
        return self.pageName

