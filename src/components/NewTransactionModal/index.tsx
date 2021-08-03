import { useState } from 'react';
import { FormEvent } from 'react';
import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import imgClose from '../../assets/close.svg'
import imgIncome from '../../assets/income.svg';
import imgOutcome from '../../assets/outcome.svg';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

Modal.setAppElement("#root");

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [type, setType] = useState('deposit');
    const [category, setCategory] = useState('');

    function handleCreateNewTransaction(event: FormEvent) {

        event.preventDefault();

        console.log(title, value, type, category);

    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >

            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
            >
                <img src={imgClose} alt='Fechar Modal' />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2> Cadastrar Transação</h2>
                <input
                    placeholder='Titulo'
                    value={title}
                    onChange={event => setTitle(event.target.value)} />
                <input
                    type='number'
                    placeholder='Valor'
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}
                />
                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={() => { setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor='green'
                    >
                        <img src={imgIncome} alt='Entrada' />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type='button'
                        onClick={() => { setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={imgOutcome} alt='Saida' />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)} />
                <button type='submit'>
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )

}