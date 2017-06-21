import {View} from 'backbone';
import _ from 'underscore';
import ChampionLinks from '../views/ChampionLinks';
import ChampionDetails from '../views/ChampionDetails';
import Champions from '../collections/Champions';

/**
 * Object representing the TeamLinks element
 *
 * @constructor
 */
const ChampionListView = View.extend({
    templateChampions: '',
    templateError: '',

    initialize: function ()
    {
        //Set templates to use later on
        this.templateChampions = _.template(this.$('#template-champions').html());
        this.templateError = _.template(this.$('#template-error').html());

        //Listen to global events for change of new club
        App.events.on('loadChampions', this.loadChampions, this);
        App.events.on('removeChampions', this.removeChampions, this);
    },

    /**
     * Wrapper function to load the champions through the collection
     *
     * @param data
     */
    loadChampions: function (data)
    {
        this.collection.fetch({
            success: (collection) => this.loadChampionsSuccessHandler(collection),
            error: (collection, response) => this.loadChampionsErrorHandler(collection, response),
            data: {
                name: data.name
            }
        });
    },

    //Remove all champions
    removeChampions: function()
    {
        this.$el.html('');
    },

    /**
     * Success Handler will add HTML of matches to this $el
     *
     * @param collection
     */
    loadChampionsSuccessHandler: function (collection)
    {
        this.$el.html(this.templateChampions({champions: collection.models}));
        new ChampionLinks({el: '.champion-links'});
        App.events.trigger('removeRunes', {});  
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadChampionsErrorHandler: function (collection, response)
    {
        console.log(response);
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    }
});

export default ChampionListView;
