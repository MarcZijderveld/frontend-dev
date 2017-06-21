import {View} from 'backbone';
import _ from 'underscore';
import RuneLinks from '../views/ChampionLinks';
import ChampionDetails from '../views/ChampionDetails';
import Champions from '../collections/Champions';

/**
 * Object representing the TeamLinks element
 *
 * @constructor
 */
const ChampionListView = View.extend({
    templateRunes: '',
    templateError: '',

    initialize: function ()
    {
        //Set templates to use later on
        this.templateRunes = _.template(this.$('#template-runes').html());
        this.templateError = _.template(this.$('#template-error').html());

        //Listen to global events for change of new club
        App.events.on('loadRunes', this.loadRunes, this);
        App.events.on('removeRunes', this.removeRunes, this);
    },

    /**
     * Wrapper function to load the champions through the collection
     *
     * @param data
     */
    loadRunes: function (data)
    {
        this.collection.fetch({
            success: (collection) => this.loadRunesSuccessHandler(collection),
            error: (collection, response) => this.loadRunesErrorHandler(collection, response),
            data: {
                name: data.name
            }
        });

        App.events.trigger('removeChampions', {});  
        App.events.trigger('removeChampion', {});
    },

    removeRunes: function()
    {
        this.$el.html('');
    },

    /**
     * Success Handler will add HTML of matches to this $el
     *
     * @param collection
     */
    loadRunesSuccessHandler: function (collection)
    {
        this.$el.html(this.templateRunes({runes: collection.models}));
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadRunesErrorHandler: function (collection, response)
    {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    }
});

export default ChampionListView;
