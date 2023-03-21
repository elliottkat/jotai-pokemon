import React from 'react';
import {
    Box,
    Button,
    Grommet,
    grommet,
    Table,
    TableBody,
    Text,
    TextInput,
    TableRow,
    TableCell,
    TipProps,
} from 'grommet';
import { Add, FormClose, Edit } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import { useAtom, Provider } from 'jotai';
import {
    filterPokemonAtom,
    pokemonAddNameAtom,
    pokemonAddTypeAtom,
    pokemonEditNameAtom,
    pokemonDeleteNameAtom,
    pokemonEditNewNameAtom,
    pokemonEditNewTypeAtom,
} from './atoms';
import { pokemon } from './pokemonData';
import './App.css';

const typeIncludesFilter = (typeArray: string[], filter: string) => {
    for (let i = 0; i < typeArray.length; i++) {
        if (typeArray[i].toLowerCase().includes(filter)) {
            return true;
        }
    }
};

const customInputTheme = deepMerge(grommet, {
    global: {
        colors: {
            border: 'black',
        },
        focus: {
            outline: {
                color: 'black',
            },
        },
    },
});

export const App = (): any => {
    const [filter, setFilter] = useAtom(filterPokemonAtom);
    const [pokemonNameToAdd, setPokemonNameToAdd] = useAtom(pokemonAddNameAtom);
    const [pokemonAddType, setPokemonAddType] = useAtom(pokemonAddTypeAtom);
    const [pokemonNameToEdit, setPokemonNameToEdit] = useAtom(pokemonEditNameAtom);
    const [pokemonNewName, setNewPokemonName] = useAtom(pokemonEditNewNameAtom);
    const [pokemonNewType, setPokemonNewType] = useAtom(pokemonEditNewTypeAtom);
    const [pokemonNameToDelete, setPokemonNameToDelete] = useAtom(pokemonDeleteNameAtom);

    const getPokemonFromList = (name: string) => {
        return pokemon.find((item) => item.name.english === name);
    };

    const createButtonTip = (tipString: string): TipProps => {
        return {
            plain: true,
            dropProps: {
                align: { left: 'right' },
                background: 'gray',
            },
            content: (
                <Box border={false} round="small" background="gray" pad="xsmall">
                    <Text margin="none" color="white" size="small">
                        {tipString}
                    </Text>
                </Box>
            ),
        };
    };

    const addPokemon = () => {
        const pokemonLocalizedNames = {
            english: pokemonNameToAdd,
            japanese: pokemonNameToAdd,
            chinese: pokemonNameToAdd,
            french: pokemonNameToAdd,
        };

        const pokemonBody: any = {
            id: Math.floor(Math.random() * 1001),
            name: pokemonLocalizedNames,
            type: [pokemonAddType],
            base: {},
        };

        pokemon.push(pokemonBody);

        setPokemonNameToAdd('');
        setPokemonAddType('');
    };

    const editPokemon = () => {
        const pokemonItem = getPokemonFromList(pokemonNameToEdit);

        // eslint-disable-next-line
        // @ts-ignore
        const pokemonName = pokemonNewName ? pokemonNewName : pokemonItem.name.english;

        // eslint-disable-next-line
        // @ts-ignore
        const pokemonType = pokemonNewType ? pokemonNewType : pokemonItem.type;

        const pokemonLocalizedNames = {
            english: pokemonName,
            japanese: pokemonName,
            chinese: pokemonName,
            french: pokemonName,
        };

        const pokemonBody: any = {
            id: Math.floor(Math.random() * 1001),
            name: pokemonLocalizedNames,
            type: [pokemonType],
            base: pokemonItem ? pokemonItem.base : {},
        };

        pokemon[pokemon.findIndex((item) => item.name.english === pokemonNameToEdit)] = pokemonBody;

        setPokemonNameToEdit('');
        setNewPokemonName('');
        setPokemonNewType('');
    };

    const deletePokemon = () => {
        pokemon.splice(
            pokemon.findIndex((item) => item.name.english === pokemonNameToDelete),
            1,
        );

        setPokemonNameToDelete('');
    };

    const FilterComponent = (
        <Box margin={{ bottom: 'none' }} pad={{ bottom: 'small' }} width="65%" align="left">
            <Text style={{ fontWeight: 'bold' }} margin={{ right: '10px', bottom: 'small' }}>
                Filter:
            </Text>
            <TextInput size="small" value={filter} onChange={(event) => setFilter(event.target.value)} />
        </Box>
    );

    const AddComponent = (
        <Box margin={{ bottom: 'none' }} pad={{ bottom: 'small' }} width="65%" align="left">
            <Box direction="row" justify="between" gap="large" margin={{ bottom: 'small' }}>
                <Text style={{ fontWeight: 'bold' }} margin={{ right: '18px' }}>
                    Add:
                </Text>
                <Button
                    tip={
                        getPokemonFromList(pokemonNameToAdd) &&
                        pokemonNameToAdd &&
                        createButtonTip(`Pokemon ${pokemonNameToAdd} already exists.`)
                    }
                    onClick={() => {
                        if (!getPokemonFromList(pokemonNameToAdd) && pokemonNameToAdd && pokemonAddType) {
                            addPokemon();
                        }
                    }}
                >
                    <Add
                        color={
                            getPokemonFromList(pokemonNameToAdd) || !pokemonNameToAdd || !pokemonAddType
                                ? '#B0B0B0'
                                : 'black'
                        }
                    />
                </Button>
            </Box>
            <Box margin={{ bottom: 'small' }} pad="small" width="100%" align="left" border round="8px">
                <Box pad={{ bottom: 'small' }}>
                    <TextInput
                        size="small"
                        value={pokemonNameToAdd}
                        onChange={(event) => setPokemonNameToAdd(event.target.value)}
                        placeholder="Name"
                        reverse
                    />
                </Box>
                <TextInput
                    size="small"
                    value={pokemonAddType}
                    onChange={(event) => setPokemonAddType(event.target.value)}
                    placeholder="Type"
                    reverse
                />
            </Box>
        </Box>
    );

    const EditComponent = (
        <Box margin={{ bottom: 'none' }} pad={{ bottom: 'small' }} width="65%" align="left">
            <Box direction="row" justify="between" gap="large" margin={{ bottom: 'small' }}>
                <Text style={{ fontWeight: 'bold' }} margin={{ right: '18px' }}>
                    Edit:
                </Text>
                <Button
                    tip={
                        !getPokemonFromList(pokemonNameToEdit) && pokemonNameToEdit
                            ? createButtonTip(`Pokemon ${pokemonNameToEdit} does not exist.`)
                            : !pokemonNewName && !pokemonNewType
                            ? createButtonTip('Either a new name or type is required.')
                            : ''
                    }
                    onClick={() => {
                        if (getPokemonFromList(pokemonNameToEdit) && (pokemonNewName || pokemonNewType)) {
                            editPokemon();
                        }
                    }}
                >
                    <Edit
                        color={
                            !getPokemonFromList(pokemonNameToEdit) || (!pokemonNewName && !pokemonNewType)
                                ? '#B0B0B0'
                                : 'black'
                        }
                        size="24px"
                    />
                </Button>
            </Box>
            <Box margin={{ bottom: 'small' }} pad="small" width="100%" align="left" border round="8px">
                <Box pad={{ bottom: 'small' }}>
                    <TextInput
                        size="small"
                        value={pokemonNameToEdit}
                        onChange={(event) => setPokemonNameToEdit(event.target.value)}
                        placeholder="Existing Name"
                        reverse
                    />
                </Box>
                <Box pad={{ bottom: 'small' }}>
                    <TextInput
                        size="small"
                        value={pokemonNewName}
                        onChange={(event) => setNewPokemonName(event.target.value)}
                        placeholder="New Name"
                        reverse
                    />
                </Box>
                <TextInput
                    size="small"
                    value={pokemonNewType}
                    onChange={(event) => {
                        if (event.target.value.length > 0) {
                            setPokemonNewType(event.target.value);
                        }
                    }}
                    placeholder="New Type"
                    reverse
                />
            </Box>
        </Box>
    );

    const DeleteComponent = (
        <Box margin={{ bottom: 'small' }} width="65%" align="left">
            <Box direction="row" justify="between" gap="large" margin={{ bottom: 'none' }}>
                <Text style={{ fontWeight: 'bold' }} margin={{ right: '18px' }}>
                    Delete:
                </Text>
                <Button
                    tip={
                        getPokemonFromList(pokemonNameToDelete)
                            ? ''
                            : createButtonTip(`Pokemon ${pokemonNameToDelete} does not exist.`)
                    }
                    onClick={() => {
                        if (getPokemonFromList(pokemonNameToDelete) && pokemonNameToDelete) {
                            deletePokemon();
                        }
                    }}
                >
                    <FormClose
                        color={!getPokemonFromList(pokemonNameToDelete) || !pokemonNameToDelete ? '#B0B0B0' : 'black'}
                        size="35px"
                    />
                </Button>
            </Box>
            <TextInput
                size="small"
                value={pokemonNameToDelete}
                onChange={(event) => setPokemonNameToDelete(event.target.value)}
                placeholder="Name"
                reverse
            />
        </Box>
    );

    const TableComponent = (
        <Table width="100%" margin="none">
            <TableBody>
                {pokemon
                    .filter((pokemon) => {
                        return (
                            pokemon.name.english.toLowerCase().includes(filter.toLowerCase()) ||
                            typeIncludesFilter(pokemon.type, filter)
                        );
                    })
                    .sort((a, b) => (a.name.english && b.name.english && a.name.english > b.name.english ? 1 : -1))
                    .map(({ id, name: { english }, type }) => (
                        <TableRow key={id}>
                            <TableCell>{english}</TableCell>
                            <TableCell>{type.join(', ')}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );

    return (
        <Provider>
            <Grommet theme={customInputTheme}>
                <Box style={{ width: 800, margin: 'auto', padding: '1rem' }}>
                    {FilterComponent}
                    {AddComponent}
                    {EditComponent}
                    {DeleteComponent}
                    {TableComponent}
                </Box>
            </Grommet>
        </Provider>
    );
};
