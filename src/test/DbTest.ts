import { UserCredentialsDBAccess } from '../Authorization/UserCredentialsDBAccess';
import { AccessRight } from '../Shared/Models';

class DbTest {
  public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}

new DbTest().dbAccess.putUserCredentials({
  username: 'user1',
  password: 'password1',
  accessRights: [AccessRight.CREATE, AccessRight.READ]
});
