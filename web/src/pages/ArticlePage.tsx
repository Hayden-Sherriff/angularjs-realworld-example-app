import { useParams } from 'react-router-dom';
import { PageStub } from './PageStub';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <PageStub
      title="Article"
      description={`Article detail for slug "${slug ?? ''}" — comments and author meta.`}
    />
  );
}

export default ArticlePage;
