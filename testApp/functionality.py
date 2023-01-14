from loginSystem.models import Profile
from .models import Records
from .models import BestScore


#> Function That Get The Best Score of A User
def get_best_score(fname):
    all_scores = Records.objects.all().filter(username=fname).order_by("-wpm")
    return all_scores[0]




#> Function That Get The Ranking Globaly for Specific User
def myRankingGlobally(username):
    allRanks = BestScore.objects.all().order_by("-wpm")
    count = 0
    for rank in allRanks:
        count += 1
        if rank.user == username:
            return count
    return count





#> Function That Get The Best Scores On Globals
def globalScores():
    result = []
    users = Profile.objects.all()
    for prf in users:
        value = get_best_score(prf)
        result.append(value)
    return result    



#> Function That Get The Best Scores On Globals
def regionScores(country="USA"):
    result = []
    users = Profile.objects.all().filter(country=country)
    for prf in users:
        value = get_best_score(prf)
        result.append(value)
    return result  

