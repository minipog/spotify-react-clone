import { Header, Image, Table } from 'semantic-ui-react';

const Songs = ({ songs, onSongClick }) => {
    return songs.length ? (
        <Table basic style={{ color: '#ffe' }}>
            <Table.Header>
                <Table.Row>
                    {['#', 'TITLE', 'ALBUM', 'LENGTH'].map((header) => (
                        <Table.HeaderCell key={header} style={{ color: '#ffed' }}>
                            {header}
                        </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {songs.map((song, i) => (
                    <Table.Row key={song.uri}>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>
                            <Header className="song-item" as="h4" image onClick={() => onSongClick(song.uri)}>
                                <Image src={song.img} rounded size="small" />
                                <Header.Content style={{ color: '#ffe' }}>
                                    {song.title}
                                    <Header.Subheader style={{ color: '#ffed' }}>{song.artist}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{song.album}</Table.Cell>
                        <Table.Cell>{song.length}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ) : (
        ''
    );
};

export default Songs;
