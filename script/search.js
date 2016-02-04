function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        ;
}

function searcher() {
    function getResultsLocal(query) {
        var returnValue = [];
        var ret = $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search",
            method: "GET",
            data: {
                key: "AIzaSyBgskTMHaLUgFb4v60Ehrf1gzHZSFUOCjI",
                part: "snippet",
                q: query,
                type: "video"
            },
            async: false
        }).responseText;
        ret = jQuery.parseJSON(ret);
        ret = ret.items;
        for (var i = 0; i < ret.length; i++) {
            var adding = [];
            adding["title"] = ret[i].snippet.title;
            adding["channel"] = ret[i].snippet.channelTitle;
            adding["description"] = ret[i].snippet.description;
            adding["thumbnail"] = ret[i].snippet.thumbnails.default.url;
            adding["network"] = playerTypes.youtube;
            adding["id"] = ret[i].id.videoId;
            returnValue.push(adding);
        }
        var retSC = $.ajax({
            url: "http://api.soundcloud.com/tracks/",
            method: "GET",
            data: {
                client_id: "2d28682500313c875bb5bbd8fe96ebad",
                q: query
            },
            async: false
        }).responseText;
        retSC = jQuery.parseJSON(retSC);
        for (var i = 0; i < retSC.length; i++) {
            var adding = [];
            adding["title"] = retSC[i].title;
            adding["channel"] = retSC[i].user.username;
            adding["description"] = retSC[i].tag_list;
            adding["thumbnail"] = retSC[i].artwork_url;
            adding["network"] = playerTypes.soundcloud;
            adding["id"] = retSC[i].id;
            returnValue.push(adding);
        }
        return returnValue;
    };

    this.assignSearch = function assignSearchLocal(searchInput, resultDiv) {
        searchInput = $(searchInput);
        resultDiv = $(resultDiv);
        searchInput.on("keypress", function (e) {
            if (e.which != 13)
                return;
            var res = getResultsLocal(searchInput.val());
            var html = "<tbody id='searchResult'>";
            for (var i = 0; i < res.length; i++) {
                html += "<tr><div class='search-result-item'>";
                html += "<td class='search-result-thumbnail-td'><div class='search-result-thumbnail' style='background-image: url(" + res[i]['thumbnail'] + ");'></div></td>";
                html += "<td class='search-result-title-td'><label class='search-result-title'>" + res[i]["title"] + "</label></td>";
                html += "<td class='search-result-author-td'><label class='search-result-author'>" + res[i]["channel"] + "</label></td>";
                html += "<td class='search-result-play-td'><img src='imgs/media23.png' onclick='readMusic(\"" + res[i]['network'] + '\",\"' + res[i]['id'] + "\");'/></td></tr>"
                html += "</div>"
            }
            html += "</tbody>";
            resultDiv.html(html);
        });
    }
}
var search = new searcher();