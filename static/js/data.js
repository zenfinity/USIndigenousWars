tribalOutlinesUrl = "https://storage.cloud.google.com/usindigenouswarsappdata/Tribal_Lands_Ceded_to_the_United_States_Sample.geojson"

tribalOutlines2 = $.ajax({
    dataType: "json",
    url: tribalOutlinesUrl,
    success: function(data) {
        $(data.features).each(function(key, data) {
            district_boundary.addData(data);
        });
    }
    }).error(function() {});