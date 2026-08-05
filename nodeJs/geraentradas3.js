fs = require('fs');

// Tabelas de Quantização do Padrão JPEG, Annex K
DefaultQuantLuminance = new Uint8Array([16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99]);
DefaultQuantChrominance = new Uint8Array([17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99]);
ZigZagInv = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);

// Tabelas de Huffman
DcLuminanceCodesPerBitsize = new Uint8Array([0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]);
DcLuminanceValues = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
AcLuminanceCodesPerBitsize = new Uint8Array([0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125]);
AcLuminanceValues = new Uint8Array([0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07, 0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xA1, 0x08, 0x23, 0x42, 0xB1, 0xC1, 0x15, 0x52, 0xD1, 0xF0, 0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0A, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5A, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6A, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7A, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9A, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0xAA, 0xB2, 0xB3, 0xB4, 0xB5, 0xB6, 0xB7, 0xB8, 0xB9, 0xBA, 0xC2, 0xC3, 0xC4, 0xC5, 0xC6, 0xC7, 0xC8, 0xC9, 0xCA, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7, 0xD8, 0xD9, 0xDA, 0xE1, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7, 0xE8, 0xE9, 0xEA, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8, 0xF9, 0xFA]);

DcChrominanceCodesPerBitsize = new Uint8Array([0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
DcChrominanceValues = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

AcChrominanceCodesPerBitsize = new Uint8Array([0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119]);
AcChrominanceValues = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x11, 0x04, 0x05, 0x21, 0x31, 0x06, 0x12, 0x41, 0x51, 0x07, 0x61, 0x71, 0x13, 0x22, 0x32, 0x81, 0x08, 0x14, 0x42, 0x91, 0xA1, 0xB1, 0xC1, 0x09, 0x23, 0x33, 0x52, 0xF0, 0x15, 0x62, 0x72, 0xD1, 0x0A, 0x16, 0x24, 0x34, 0xE1, 0x25, 0xF1, 0x17, 0x18, 0x19, 0x1A, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5A, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6A, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7A, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9A, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0xAA, 0xB2, 0xB3, 0xB4, 0xB5, 0xB6, 0xB7, 0xB8, 0xB9, 0xBA, 0xC2, 0xC3, 0xC4, 0xC5, 0xC6, 0xC7, 0xC8, 0xC9, 0xCA, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7, 0xD8, 0xD9, 0xDA, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7, 0xE8, 0xE9, 0xEA, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8, 0xF9, 0xFA]);

CodeWordLimit = 2048; // short em C é compatível com Number no JS

outputBuffer = Buffer.alloc(1024 * 1024); // Buffer de 1MB
outputPtr = 0;
bitBuffer = { data: 0, numBits: 0 };

// --- Helper Functions ---
minimum = (value, maximum) => (value <= maximum ? value : maximum);
minimum_int = (value, maximum) => (value <= maximum ? value : maximum);
clamp = (value, minValue, maxValue) => {
	if (value <= minValue) return minValue;
	if (value >= maxValue) return maxValue;
	return value;
};
rgb2y = (r, g, b) => +0.299 * r + 0.587 * g + 0.114 * b;
rgb2cb = (r, g, b) => -0.16874 * r - 0.33126 * g + 0.5 * b;
rgb2cr = (r, g, b) => +0.5 * r - 0.41869 * g - 0.08131 * b;

// --- DCT Implementation ---

function DCT(block, stride, offset = 0) {
	SqrtHalfSqrt = 1.306562965;
	InvSqrt = 0.707106781;
	HalfSqrtSqrt = 0.382683432;
	InvSqrtSqrt = 0.5411961;

	// Acessamos o array 'block' via índices multiplicados pelo stride
	b = (row) => offset + row * stride;

	add07 = block[b(0)] + block[b(7)]; sub07 = block[b(0)] - block[b(7)];
	add16 = block[b(1)] + block[b(6)]; sub16 = block[b(1)] - block[b(6)];
	add25 = block[b(2)] + block[b(5)]; sub25 = block[b(2)] - block[b(5)];
	add34 = block[b(3)] + block[b(4)]; sub34 = block[b(3)] - block[b(4)];

	add0347 = add07 + add34; sub07_34 = add07 - add34;
	add1256 = add16 + add25; sub16_25 = add16 - add25;

	block[b(0)] = add0347 + add1256;
	block[b(4)] = add0347 - add1256;

	z1 = (sub16_25 + sub07_34) * InvSqrt;
	block[b(2)] = sub07_34 + z1;
	block[b(6)] = sub07_34 - z1;

	sub23_45 = sub25 + sub34;
	sub12_56 = sub16 + sub25;
	sub01_67 = sub16 + sub07;

	z5 = (sub23_45 - sub01_67) * HalfSqrtSqrt;
	z2 = sub23_45 * InvSqrtSqrt + z5;
	z3 = sub12_56 * InvSqrt;
	z4 = sub01_67 * SqrtHalfSqrt + z5;
	z6 = sub07 + z3;
	z7 = sub07 - z3;

	block[b(1)] = z6 + z4; block[b(7)] = z6 - z4;
	block[b(5)] = z7 + z2; block[b(3)] = z7 - z2;
}

// --- BitWriter Functions ---
function write_bits(bitCode) {
	bitBuffer.numBits += bitCode.numBits;
	bitBuffer.data <<= bitCode.numBits;
	bitBuffer.data |= bitCode.code;

	while (bitBuffer.numBits >= 8) {
		bitBuffer.numBits -= 8;
		oneByte = (bitBuffer.data >> bitBuffer.numBits) & 0xFF;

		outputBuffer[outputPtr++] = oneByte;
		if (oneByte === 0xFF) {
			outputBuffer[outputPtr++] = 0x00; // Byte stuffing do JPEG
		}
	}
}

function write_byte(oneByte) {
	outputBuffer[outputPtr++] = oneByte;
}

function write_bytes(bytes, count) {
	for (i = 0; i < count; i++) {
		outputBuffer[outputPtr++] = bytes[i];
	}
}

function flush() {
	write_bits({ code: 0x7F, numBits: 7 });
	bitBuffer.data = 0;
	bitBuffer.numBits = 0;
}

function add_marker(id, length) {
	outputBuffer[outputPtr++] = 0xFF;
	outputBuffer[outputPtr++] = id;
	outputBuffer[outputPtr++] = (length >> 8) & 0xFF;
	outputBuffer[outputPtr++] = length & 0xFF;
}

// --- Huffman Table Generation ---
function generateHuffmanTable(numCodes, values) {
	table = new Array(256).fill(null).map(() => ({ code: 0, numBits: 0 }));
	huffmanCode = 0;
	vIndex = 0;
	for (n = 1; n <= 16; n++) {
		for (i = 0; i < numCodes[n - 1]; i++) {
			table[values[vIndex++]] = {
				code: huffmanCode++,
				numBits: n
			};
		}
		huffmanCode <<= 1;
	}
	return table;
}

// Codifica um bloco 8x8
function encodeBlock(block, scaled, lastDC, huffmanDC, huffmanAC, codewords) {
	// Block já é tratado como um array flat de 64 posições (float *block64)

	// DCT: Processa as linhas (stride 1, offset de 8 em 8)
	for (i = 0; i < 8; i++) DCT(block, 1, i * 8);
	// DCT: Processa as colunas (stride 8, offset de 1 em 1)
	for (i = 0; i < 8; i++) DCT(block, 8, i);
	// Escalonamento e Quantização
	for (i = 0; i < 64; i++) block[i] *= scaled[i];

	// DC: Arredondamento manual (equivalente ao (int)(val + 0.5f))
	DC = Math.floor(block[0] + (block[0] >= 0 ? 0.5 : -0.5));

	posNonZero = 0;
	quantized = new Int16Array(64); // short em C

	// AC: ZigZag e Quantização
	for (i = 1; i < 64; i++) {
		value = block[ZigZagInv[i]];
		q = Math.floor(value + (value >= 0 ? 0.5 : -0.5));
		quantized[i] = q;
		if (q !== 0) posNonZero = i;
	}

	// Codifica a diferença DC
	diff = DC - lastDC;
	if (diff === 0) write_bits(huffmanDC[0x00]);
	else {
		bits = codewords[diff + CodeWordLimit]; // Ajuste de índice para o array de codewords
		write_bits(huffmanDC[bits.numBits]);
		write_bits(bits);
	}

	// Codifica os coeficientes AC (Run-length encoding)
	rleOffset = 0;
	for (i = 1; i <= posNonZero; i++) {
		while (quantized[i] === 0 && i <= posNonZero) {
			rleOffset += 0x10;
			if (rleOffset > 0xF0) {
				write_bits(huffmanAC[0xF0]); // Marcador ZRL (Zero Run Length)
				rleOffset = 0;
			}
			i++;
		}

		if (i <= posNonZero) {
			encoded = codewords[quantized[i] + CodeWordLimit];
			write_bits(huffmanAC[rleOffset + encoded.numBits]);
			write_bits(encoded);
			rleOffset = 0;
		}
	}

	// End of Block (EOB)
	if (posNonZero < 63) write_bits(huffmanAC[0x00]);

	return DC;
}

function writeJpeg(pixels, width, height, filename) {
	isRGB = true;
	quality = 90;
	downsample = false;

	// Reset do estado global do buffer
	outputPtr = 0;
	bitBuffer = { data: 0, numBits: 0 };

	// 1. JFIF Header
	HeaderJfif = Buffer.from([
		0xFF, 0xD8, 0xFF, 0xE0, 0, 16,
		0x4A, 0x46, 0x49, 0x46, 0, // 'JFIF'
		1, 1, 0, 0, 1, 0, 1, 0, 0
	]);
	write_bytes(HeaderJfif, 20);

	// 2. Ajuste de Qualidade
	qFactor = clamp(quality, 1, 100);
	qFactor = qFactor < 50 ? 5000 / qFactor : 200 - qFactor * 2;

	quantLuminance = new Uint8Array(64);
	quantChrominance = new Uint8Array(64);
	for (i = 0; i < 64; i++) {
		lum = Math.floor((DefaultQuantLuminance[ZigZagInv[i]] * qFactor + 50) / 100);
		chr = Math.floor((DefaultQuantChrominance[ZigZagInv[i]] * qFactor + 50) / 100);
		quantLuminance[i] = clamp(lum, 1, 255);
		quantChrominance[i] = clamp(chr, 1, 255);
	}

	// 3. Tabelas de Quantização (DQT)
	add_marker(0xDB, 2 + (isRGB ? 2 : 1) * 65);
	write_byte(0x00);
	write_bytes(quantLuminance, 64);
	if (isRGB) {
		write_byte(0x01);
		write_bytes(quantChrominance, 64);
	}

	// 4. Start of Frame (SOF0)
	add_marker(0xC0, 2 + 6 + 3 * 3);
	write_byte(0x08); // 8 bits per channel
	write_byte(height >> 8); write_byte(height & 0xFF);
	write_byte(width >> 8);  write_byte(width & 0xFF);
	write_byte(3); // num components
	for (id = 1; id <= 3; id++) {
		write_byte(id);
		write_byte(0x11); // Sampling factor
		write_byte(id === 1 ? 0 : 1); // Quant table ID
	}

	// 5. Huffman Tables (DHT)
	add_marker(0xC4, 2 + 208 + 208);
	// Luminance
	write_byte(0x00);
	write_bytes(DcLuminanceCodesPerBitsize, 16);
	write_bytes(DcLuminanceValues, 12);
	write_byte(0x10);
	write_bytes(AcLuminanceCodesPerBitsize, 16);
	write_bytes(AcLuminanceValues, 162);

	hLuminanceDC = generateHuffmanTable(DcLuminanceCodesPerBitsize, DcLuminanceValues);
	hLuminanceAC = generateHuffmanTable(AcLuminanceCodesPerBitsize, AcLuminanceValues);

	// Chrominance
	write_byte(0x01);
	write_bytes(DcChrominanceCodesPerBitsize, 16);
	write_bytes(DcChrominanceValues, 12);
	write_byte(0x11);
	write_bytes(AcChrominanceCodesPerBitsize, 16);
	write_bytes(AcChrominanceValues, 162);

	hChrominanceDC = generateHuffmanTable(DcChrominanceCodesPerBitsize, DcChrominanceValues);
	hChrominanceAC = generateHuffmanTable(AcChrominanceCodesPerBitsize, AcChrominanceValues);

	// 6. Start of Scan (SOS)
	add_marker(0xDA, 2 + 1 + 2 * 3 + 3);
	write_byte(3);
	for (id = 1; id <= 3; id++) {
		write_byte(id);
		write_byte(id === 1 ? 0x00 : 0x11);
	}
	write_bytes([0, 63, 0], 3);

	// 7. Preparar tabelas escalonadas (Scaled Quantization)
	scaledLum = new Float32Array(64);
	scaledChr = new Float32Array(64);
	AanScale = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379];

	for (i = 0; i < 64; i++) {
		row = Math.floor(ZigZagInv[i] / 8);
		col = ZigZagInv[i] % 8;
		factor = 1.0 / (AanScale[row] * AanScale[col] * 8);
		scaledLum[ZigZagInv[i]] = factor / quantLuminance[i];
		scaledChr[ZigZagInv[i]] = factor / quantChrominance[i];
	}

	// 8. Inicializar Codewords (Mapeamento de bits)
	// No JS usamos um Map ou um array deslocado para simular codewords[-value]
	codewords = new Array(2 * CodeWordLimit);
	numBits = 1;
	mask = 1;
	for (value = 1; value < CodeWordLimit; value++) {
		if (value > mask) {
			numBits++;
			mask = (mask << 1) | 1;
		}
		codewords[CodeWordLimit - value] = { code: mask - value, numBits: numBits };
		codewords[CodeWordLimit + value] = { code: value, numBits: numBits };
	}

	// 9. Loop de Processamento MCU
	lastYDC = 0, lastCbDC = 0, lastCrDC = 0;
	blockY = new Float32Array(64);
	blockCb = new Float32Array(64);
	blockCr = new Float32Array(64);

	for (let y = 0; y < height; y += 8) {
		for (let x = 0; x < width; x += 8) {
			for (let dy = 0; dy < 8; dy++) {
				for (let dx = 0; dx < 8; dx++) {
					let px = Math.min(x + dx, width - 1);
					let py = Math.min(y + dy, height - 1);
					let pixelPos = (py * width + px) * 3;

					let r = pixels[pixelPos];
					let g = pixels[pixelPos + 1];
					let b = pixels[pixelPos + 2];

					blockY[dy * 8 + dx] = rgb2y(r, g, b) - 128;
					blockCb[dy * 8 + dx] = rgb2cb(r, g, b);
					blockCr[dy * 8 + dx] = rgb2cr(r, g, b);
				}
			}

			lastYDC = encodeBlock(blockY, scaledLum, lastYDC, hLuminanceDC, hLuminanceAC, codewords);
			lastCbDC = encodeBlock(blockCb, scaledChr, lastCbDC, hChrominanceDC, hChrominanceAC, codewords);
			lastCrDC = encodeBlock(blockCr, scaledChr, lastCrDC, hChrominanceDC, hChrominanceAC, codewords);
		}
	}

	flush();
	write_byte(0xFF); write_byte(0xD9); // EOI

	// Salva o arquivo final
	fs.writeFileSync(filename, outputBuffer.slice(0, outputPtr));
	console.log(`Arquivo nodeJS/${filename} salvo.`);
}

width=400;
height=400;
radius=100;
qtdimagens=120;

pixels=Buffer.alloc(width*height*3);

if(!fs.existsSync('./imagens'))fs.mkdirSync('./imagens');
if(!fs.existsSync('./imagens'))fs.mkdirSync('./imagens');

for(x=0;x<qtdimagens;x++){
	pixels.fill(255);
	if(x<qtdimagens/2){ // Metade das imagens contém círculo
		cx=120+Math.floor(Math.random()*160);
		cy=120+Math.floor(Math.random()*160);
		for(y=0;y<height;y++){
			for(px=0;px<width;px++){
				dx=px-cx;
				dy=y-cy;
				if(dx*dx+dy*dy<=radius*radius){ // Se o pixel está dentro do círculo
					c=(y*width+px)*3;
					pixels[c]=0;  // R
					pixels[c+1]=0;// G
					pixels[c+2]=0;// B
				}
			}
		}
	} else{
		// Metade das imagens contém quadrado
		cx=10+Math.floor(Math.random()*180);
		cy=10+Math.floor(Math.random()*180);
		for(y=0;y<height;y++){
			for(px=0;px<width;px++){
				if (px > cx && px < cx + 200 && y > cy && y < cy + 200) {
					c=(y*width+px)*3;
					pixels[c]=0;  // R
					pixels[c+1]=0;// G
					pixels[c+2]=0;// B
				}
			}
		}
	}
	writeJpeg(pixels,width,height,`imagens/amostra${String(x).padStart(4,'0')}.jpg`);
}

console.log("\n"+qtdimagens+" arquivos imagens salvos com sucesso.");
