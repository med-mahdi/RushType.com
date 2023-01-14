from .packages import *
from loginSystem.models import Profile
from .functionality import *
from loginSystem.models import viewsTraffic





#> This Function That Return the Test Page (Typing Test)
def testPage(request):
    pageName = "Typing Test Page"
    traffic = viewsTraffic.objects.create(pageName=pageName)
    traffic.save()


    try:
        user = request.user.profile
    except:
        user = None
    if request.method == "POST" and user != None:
        wpm = request.POST["wpm"]
        # !* This For Someone Who Gonna Change The Variables From Dev Tool
        if int(wpm) <= 300:
            cpm = request.POST["cpm"]
            mistake = request.POST["mistake"]
            acc = request.POST["acc"]
            time = request.POST["time"]
            record = Records.objects.create(username=user,wpm=wpm,cpm=cpm,time=time,mistake=mistake,acc=acc)  
            record.save()
            return HttpResponse("Data Saved Now")
        else:
            return HttpResponse("Data Not Saved")

    context = {"user":user}
    return render(request,"typeTest.html",context = context)







# @login_required(login_url="loginPage")
def ranking(request):
    pageName = "ranking page"
    traffic = viewsTraffic.objects.create(pageName=pageName)
    traffic.save()


    try:
        user = request.user.profile
        dataGlobal = BestScore.objects.all().order_by("-wpm")
        regionData = BestScore.objects.all().filter(country=user.country).order_by("-wpm")
        context = {"globalData":dataGlobal,"regionData":regionData,"user":user}

    except:
        user = None
        requestData = requests.get("https://api.ipify.org/?format=json")
        ipJson = requestData.text
        data = json.loads(ipJson)
        ip = data['ip']
        requestLoc = requests.get("https://ipinfo.io/"+ip+"/geo")
        dataJson = requestLoc.text
        data = json.loads(dataJson)
        regionData = BestScore.objects.all().filter(country=data['country']).order_by("-wpm")
        dataGlobal = BestScore.objects.all().order_by("-wpm")
        context = {"globalData":dataGlobal,"regionData":regionData,"user":user,"flag":data['country']}

    return render(request,"ranking.html",context)









@login_required(login_url="loginPage")
def profilePage(request):
    pageName = "profile page"
    traffic = viewsTraffic.objects.create(pageName=pageName)
    traffic.save()

    user = request.user.profile
    user_date_created = request.user.date_joined
    print(user_date_created)
    data = Records.objects.all().filter(username=user).order_by("-id")
    cpm = data.order_by("-cpm")[0].cpm
    wpm = BestScore.objects.get(user=user).wpm
    

    myRank = myRankingGlobally(user)
    testCompleted = BestScore.objects.get(user=user).id
    context = {"cpm":cpm,"wpm":wpm,"testCompleted":testCompleted,"data":data,"myRank":myRank,"user_date_created":user_date_created}
    return render(request,"profile.html",context) 




@login_required(login_url="loginPage")
def profileDataApi(request):
    user = request.user.profile
    data = Records.objects.all().filter(username=user)
    data = list(data.values())
    return JsonResponse(data,safe=False)






def testArea(request):
    return render(request,"test.html")