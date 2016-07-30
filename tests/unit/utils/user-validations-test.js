import { email, password, passwordConfirmation } from 'peepchat/utils/user-validations';
import { module, test } from 'qunit';

module('Unit | Utility | user validations');

test('it works', function(assert) {
  assert.ok(email);
  assert.ok(password);
  assert.ok(passwordConfirmation);
});
