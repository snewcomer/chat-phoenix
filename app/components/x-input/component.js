import Ember from 'ember';

export default Ember.Component.extend({
  type: 'text',
  classNames: ['input-field'],
  _errorMessages: Ember.computed('errors.[]', function() {
    return (this.get('errors') || []).join(', ');
  }),
});
