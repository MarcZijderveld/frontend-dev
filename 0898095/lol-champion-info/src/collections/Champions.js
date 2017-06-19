import {Collection} from 'backbone';
import Champion from '../models/Champion';

/**
 * Collection for the Pokemon endpoint
 *
 * @constructor
 */
const Champions = Collection.extend({
    model: Champion,
    id: '',
    url: function() { return 'https://stud.cmi.hr.nl/0898095/riot/api/riotapi.php?id=' + this.id; }
});

export default Champions;
