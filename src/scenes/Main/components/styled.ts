import styled from 'styled-components';

export const Header = styled.h2({
    display: 'flex',
    color: '#fff',
    padding: '16px 8px',
    backgroundColor: '#333',
});

export const ListWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    backgroundColor: '#333',
    padding: '16px 8px',
});

export const BookWrapper = styled.div({
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: '8px 0',
    padding: '16px',
    borderRadius: '5px',
});

export const Info = styled.div({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
});

export const Author = styled.div({
    color: '#333',
    display: 'flex',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 0',
});

export const Name = styled.div({
    color: '#333',
    fontSize: 21,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
