import { useParams } from 'react-router-dom';
import { PageStub } from './PageStub';

// Handles /@:username and its nested /favorites tab.
export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  return (
    <PageStub
      title={`@${username ?? ''}`}
      description="User profile: bio, follow button, and authored/favorited articles."
    />
  );
}

export default ProfilePage;
