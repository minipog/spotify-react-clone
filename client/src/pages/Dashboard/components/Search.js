import { Form } from 'semantic-ui-react';

const Search = ({ query, onChange }) => {
    return (
        <Form>
            <Form.Input
                type="search"
                size="massive"
                placeholder="Search for songs or artists..."
                autoFocus
                value={query}
                onChange={(e) => onChange(e)}
            />
        </Form>
    );
};

export default Search;
