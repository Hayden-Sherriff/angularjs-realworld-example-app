// Ported from src/js/components/list-errors.{component,html}.js.
// Renders RealWorld validation errors as "<field> <message>" list items.
import type { ApiErrors } from '@/api';

export function ListErrors({ errors }: { errors?: ApiErrors | null }) {
  if (!errors) {
    return null;
  }

  return (
    <ul className="error-messages">
      {Object.entries(errors).flatMap(([field, messages]) =>
        messages.map((message) => (
          <li key={`${field}-${message}`}>
            {field} {message}
          </li>
        )),
      )}
    </ul>
  );
}

export default ListErrors;
