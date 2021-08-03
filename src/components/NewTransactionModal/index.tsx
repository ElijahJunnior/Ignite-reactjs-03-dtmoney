import { useState } from 'react';
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

    const [type, setType] = useState('deposit');

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

            <Container>
                <h2> Cadastrar Transação</h2>
                <input placeholder='Titulo' />
                <input type='number' placeholder='Valor' />
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
                <input placeholder='Categoria' />
                <button type='submit'>
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )

}