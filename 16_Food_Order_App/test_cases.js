import { renderHook, act } from '@testing-library/react';
import useHttp from './useHttp';

const requestConfig = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

test("Caso Normal - Envío de Solicitud Exitosa (POST)", async () => {
  const { result } = renderHook(() => useHttp('http://localhost:3000/orders', requestConfig));

  // Simulamos un envío exitoso
  await act(async () => {
    await result.current.sendRequest(
      JSON.stringify({ order: { items: [{ id: 'item1', quantity: 2 }] } })
    );
  });

  expect(result.current.data).toEqual({ success: true });
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

test("Caso Normal - Manejo de Error en la Solicitud", async () => {
  const { result } = renderHook(() => useHttp('http://localhost:3000/incorrect-url', requestConfig));

  await act(async () => {
    await result.current.sendRequest(
      JSON.stringify({ order: { items: [{ id: 'item1', quantity: 1 }] } })
    );
  });

  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBe('Something went wrong, failed to send request');
});

test("Caso Límite - Sin Configuración de Solicitud", async () => {
  const { result } = renderHook(() => useHttp('http://localhost:3000/orders'));

  await act(async () => {
    await result.current.sendRequest();
  });

  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

test("Caso Límite - Respuesta Vacía del Servidor", async () => {
  const { result } = renderHook(() => useHttp('http://localhost:3000/no-content', requestConfig));

  // Simulamos una respuesta vacía (204 No Content)
  await act(async () => {
    await result.current.sendRequest(
      JSON.stringify({ order: { items: [{ id: 'item1', quantity: 0 }] } })
    );
  });

  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

test("Error de Red", async () => {
  const { result } = renderHook(() => useHttp('http://localhost:3000/orders', requestConfig));

  // Simulamos un error de red (p.ej., no hay conexión)
  global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network Error'));

  await act(async () => {
    await result.current.sendRequest(
      JSON.stringify({ order: { items: [{ id: 'item1', quantity: 1 }] } })
    );
  });

  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBe('Network Error');
});

test("Caso Límite - Datos de Inicialización", async () => {
  const initialData = { order: { items: [] } };
  const { result } = renderHook(() => useHttp('http://localhost:3000/orders', requestConfig, initialData));

  // Verificamos si se carga el initialData sin hacer la solicitud
  expect(result.current.data).toEqual(initialData);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBeUndefined();
});
