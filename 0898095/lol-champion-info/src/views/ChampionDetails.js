import {View} from 'backbone';
import _ from 'underscore';

/**
 * Object representing the ChampionDetails element
 *
 * @constructor
 */
const ChampionDetails = View.extend({
    templateChampions: '',
    templateError: '',
    initialize: function () {

        //Set template to use later on view
        this.templateChampions = _.template(this.$('#template-champion-detail').html());
        this.templateError = _.template(this.$('#template-champion-error').html());

        App.events.on('newChampion', this.loadChampion, this);
        App.events.on('removeChampion', this.remove, this);
    },

    /**
     * Remove function to remove element on generation load
     */
    remove: function () {
        this.$el.html('');
    },

    /**
     * Wrapper function to load the champion through the collection
     *
     * @param data
     */
    loadChampion: function (data) {
        this.collection.id = data.id;
        this.collection.fetch({
            success: (collection) => this.loadChampionSuccessHandler(collection),
            error: (collection) => this.loadChampionErrorHandler(collection),
        });
    },

    /**
     * Success Handler will add HTML of champion to this $el
     *
     * @param collection
     */
    loadChampionSuccessHandler: function (collection) {
        this.$el.html(this.templateChampions({champions: collection.models}));
        App.events.trigger('removeChampions', {});  
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadChampionErrorHandler: function (collection, response) {
        this.templateError = _.template(this.$('#template-champion-error').html());
        this.$el.html(this.templateChampions({message: response.responseJSON.error}));
    }
});

export default ChampionDetails;