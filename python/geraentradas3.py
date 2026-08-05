import os
import math
import random

# quantization tables from JPEG Standard,Annex K
DefaultQuantLuminance=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99]
DefaultQuantChrominance=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99]
ZigZagInv=[0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]

# Huffman tables
DcLuminanceCodesPerBitsize=[0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0]
DcLuminanceValues=[0,1,2,3,4,5,6,7,8,9,10,11]
AcLuminanceCodesPerBitsize=[0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125]
AcLuminanceValues=[0x01,0x02,0x03,0x00,0x04,0x11,0x05,0x12,0x21,0x31,0x41,0x06,0x13,0x51,0x61,0x07,0x22,0x71,0x14,0x32,0x81,0x91,0xA1,0x08,0x23,0x42,0xB1,0xC1,0x15,0x52,0xD1,0xF0,0x24,0x33,0x62,0x72,0x82,0x09,0x0A,0x16,0x17,0x18,0x19,0x1A,0x25,0x26,0x27,0x28,0x29,0x2A,0x34,0x35,0x36,0x37,0x38,0x39,0x3A,0x43,0x44,0x45,0x46,0x47,0x48,0x49,0x4A,0x53,0x54,0x55,0x56,0x57,0x58,0x59,0x5A,0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6A,0x73,0x74,0x75,0x76,0x77,0x78,0x79,0x7A,0x83,0x84,0x85,0x86,0x87,0x88,0x89,0x8A,0x92,0x93,0x94,0x95,0x96,0x97,0x98,0x99,0x9A,0xA2,0xA3,0xA4,0xA5,0xA6,0xA7,0xA8,0xA9,0xAA,0xB2,0xB3,0xB4,0xB5,0xB6,0xB7,0xB8,0xB9,0xBA,0xC2,0xC3,0xC4,0xC5,0xC6,0xC7,0xC8,0xC9,0xCA,0xD2,0xD3,0xD4,0xD5,0xD6,0xD7,0xD8,0xD9,0xDA,0xE1,0xE2,0xE3,0xE4,0xE5,0xE6,0xE7,0xE8,0xE9,0xEA,0xF1,0xF2,0xF3,0xF4,0xF5,0xF6,0xF7,0xF8,0xF9,0xFA]
DcChrominanceCodesPerBitsize=[0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0]
DcChrominanceValues=[0,1,2,3,4,5,6,7,8,9,10,11]
AcChrominanceCodesPerBitsize=[0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119]
AcChrominanceValues=[0x00,0x01,0x02,0x03,0x11,0x04,0x05,0x21,0x31,0x06,0x12,0x41,0x51,0x07,0x61,0x71,0x13,0x22,0x32,0x81,0x08,0x14,0x42,0x91,0xA1,0xB1,0xC1,0x09,0x23,0x33,0x52,0xF0,0x15,0x62,0x72,0xD1,0x0A,0x16,0x24,0x34,0xE1,0x25,0xF1,0x17,0x18,0x19,0x1A,0x26,0x27,0x28,0x29,0x2A,0x35,0x36,0x37,0x38,0x39,0x3A,0x43,0x44,0x45,0x46,0x47,0x48,0x49,0x4A,0x53,0x54,0x55,0x56,0x57,0x58,0x59,0x5A,0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6A,0x73,0x74,0x75,0x76,0x77,0x78,0x79,0x7A,0x82,0x83,0x84,0x85,0x86,0x87,0x88,0x89,0x8A,0x92,0x93,0x94,0x95,0x96,0x97,0x98,0x99,0x9A,0xA2,0xA3,0xA4,0xA5,0xA6,0xA7,0xA8,0xA9,0xAA,0xB2,0xB3,0xB4,0xB5,0xB6,0xB7,0xB8,0xB9,0xBA,0xC2,0xC3,0xC4,0xC5,0xC6,0xC7,0xC8,0xC9,0xCA,0xD2,0xD3,0xD4,0xD5,0xD6,0xD7,0xD8,0xD9,0xDA,0xE2,0xE3,0xE4,0xE5,0xE6,0xE7,0xE8,0xE9,0xEA,0xF2,0xF3,0xF4,0xF5,0xF6,0xF7,0xF8,0xF9,0xFA]

CodeWordLimit=2048
outputBuffer=bytearray()
outputPtr=0
BitBuffer={"data":0,"numBits":0}

# --- Funções Auxiliares ---
def clamp(v,mn,mx): return max(mn,min(v,mx))
def rgb2y(r,g,b): return 0.299*r+0.587*g+0.114*b
def rgb2cb(r,g,b): return -0.16874*r-0.33126*g+0.5*b
def rgb2cr(r,g,b): return 0.5*r-0.41869*g-0.08131*b

def write_byte(val):
    global outputBuffer,outputPtr
    outputBuffer.append(val&0xFF); outputPtr+=1

def write_bytes(data):
    global outputBuffer,outputPtr
    outputBuffer.extend(data); outputPtr+=len(data)

def add_marker(marker_id,length):
    global outputBuffer,outputPtr
    outputBuffer.append(0xFF)
    outputBuffer.append(marker_id)
    outputBuffer.append((length >> 8) & 0xFF)
    outputBuffer.append(length & 0xFF)
    outputPtr += 4

def write_bits(BitCode):
    global BitBuffer,outputBuffer,outputPtr
    BitBuffer["numBits"] += BitCode["numBits"]
    BitBuffer["data"] <<= BitCode["numBits"]
    BitBuffer["data"] |= BitCode["code"]
    while BitBuffer["numBits"] >= 8:
        BitBuffer["numBits"] -= 8
        oneByte=(BitBuffer["data"] >> BitBuffer["numBits"]) & 0xFF
        outputBuffer.append(oneByte); outputPtr+=1
        if oneByte == 0xFF:
            outputBuffer.append(0x00); outputPtr+=1

def flush():
    write_bits({"code":0x7F,"numBits":7})
    BitBuffer["data"]=0; BitBuffer["numBits"]=0

# --- DCT ---
def DCT(block,stride,offset=0):
    SqrtHalfSqrt=1.306562965; InvSqrt=0.707106781
    HalfSqrtSqrt=0.382683432; InvSqrtSqrt=0.5411961
    def b(row): return offset+row*stride
    add07=block[b(0)]+block[b(7)]; sub07=block[b(0)]-block[b(7)]
    add16=block[b(1)]+block[b(6)]; sub16=block[b(1)]-block[b(6)]
    add25=block[b(2)]+block[b(5)]; sub25=block[b(2)]-block[b(5)]
    add34=block[b(3)]+block[b(4)]; sub34=block[b(3)]-block[b(4)]
    add0347=add07+add34; sub07_34=add07-add34
    add1256=add16+add25; sub16_25=add16-add25
    block[b(0)]=add0347+add1256; block[b(4)]=add0347-add1256
    z1=(sub16_25+sub07_34)*InvSqrt
    block[b(2)]=sub07_34+z1; block[b(6)]=sub07_34-z1
    sub23_45=sub25+sub34; sub12_56=sub16+sub25; sub01_67=sub16+sub07
    z5=(sub23_45-sub01_67)*HalfSqrtSqrt
    z2=sub23_45*InvSqrtSqrt+z5; z3=sub12_56*InvSqrt
    z4=sub01_67*SqrtHalfSqrt+z5; z6=sub07+z3; z7=sub07-z3
    block[b(1)]=z6+z4; block[b(7)]=z6-z4
    block[b(5)]=z7+z2; block[b(3)]=z7-z2

# --- Huffman ---
def generate_huffman_table(numCodes,values):
    table=[{"code":0,"numBits":0} for _ in range(256)]
    huffmanCode=0; vIndex=0
    for n in range(1,17):
        for i in range(numCodes[n-1]):
            table[values[vIndex]]={"code":huffmanCode,"numBits":n}
            vIndex+=1; huffmanCode+=1
        huffmanCode<<=1
    return table

# --- Codificação de bloco ---
def encodeBlock(block,scaled,lastDC,huffmanDC,huffmanAC,codewords):
    for i in range(8): DCT(block,1,i*8)
    for i in range(8): DCT(block,8,i)
    for i in range(64): block[i]*=scaled[i]
    DC=int(block[0]+(0.5 if block[0]>=0 else -0.5))
    posNonZero=0; quantized=[0]*64
    for i in range(1,64):
        value=block[ZigZagInv[i]]
        q=int(value+(0.5 if value>=0 else -0.5))
        quantized[i]=q
        if q!=0: posNonZero=i
    diff=DC-lastDC
    if diff==0: write_bits(huffmanDC[0x00])
    else:
        bits=codewords[diff+CodeWordLimit]
        write_bits(huffmanDC[bits["numBits"]]); write_bits(bits)
    rleOffset=0; i=1
    while i<=posNonZero:
        while i<=posNonZero and quantized[i]==0:
            rleOffset+=0x10
            if rleOffset>0xF0:
                write_bits(huffmanAC[0xF0]); rleOffset=0
            i+=1
        if i<=posNonZero:
            encoded=codewords[quantized[i]+CodeWordLimit]
            write_bits(huffmanAC[rleOffset+encoded["numBits"]]); write_bits(encoded)
            rleOffset=0; i+=1
    if posNonZero<63: write_bits(huffmanAC[0x00])
    return DC

def writeJpeg(pixels,width,height,filename):
    global outputBuffer,outputPtr,BitBuffer
    isRGB=True
    quality=90

    # Reset do estado global
    outputBuffer=bytearray()
    outputPtr=0
    BitBuffer={"data": 0,"numBits": 0}

    # 1. Cabeçalho JFIF
    header=bytearray([
        0xFF,0xD8,0xFF,0xE0,0,16,
        0x4A,0x46,0x49,0x46,0,
        1,1,0,0,1,0,1,0,0
    ])
    write_bytes(header)

    # 2. Ajuste de Qualidade
    qFactor=clamp(quality,1,100)
    qFactor=5000 / qFactor if qFactor < 50 else 200 - qFactor * 2

    quantLuminance=[0]*64
    quantChrominance=[0]*64
    for i in range(64):
        lum=int((DefaultQuantLuminance[ZigZagInv[i]] * qFactor + 50) / 100)
        chr=int((DefaultQuantChrominance[ZigZagInv[i]] * qFactor + 50) / 100)
        quantLuminance[i]=clamp(lum,1,255)
        quantChrominance[i]=clamp(chr,1,255)

    # 3. Tabelas de Quantização (DQT)
    add_marker(0xDB,2 + (2 if isRGB else 1) * 65)
    write_byte(0x00)
    write_bytes(quantLuminance)
    if isRGB:
        write_byte(0x01)
        write_bytes(quantChrominance)

    # 4. Start of Frame (SOF0)
    add_marker(0xC0,2 + 6 + 3 * 3)
    write_byte(0x08)  # 8 bits por canal
    write_byte(height >> 8); write_byte(height & 0xFF)
    write_byte(width >> 8);  write_byte(width & 0xFF)
    write_byte(3)  # número de componentes
    for comp_id in range(1,4):
        write_byte(comp_id)
        write_byte(0x11)  # fator de amostragem
        write_byte(0 if comp_id == 1 else 1)  # ID da tabela de quantização

    # 5. Huffman Tables (DHT)
    add_marker(0xC4,2 + 208 + 208)
    # Luminância
    write_byte(0x00)
    write_bytes(DcLuminanceCodesPerBitsize)
    write_bytes(DcLuminanceValues)
    write_byte(0x10)
    write_bytes(AcLuminanceCodesPerBitsize)
    write_bytes(AcLuminanceValues)

    hLuminanceDC=generate_huffman_table(DcLuminanceCodesPerBitsize,DcLuminanceValues)
    hLuminanceAC=generate_huffman_table(AcLuminanceCodesPerBitsize,AcLuminanceValues)

    # Crominância
    write_byte(0x01)
    write_bytes(DcChrominanceCodesPerBitsize)
    write_bytes(DcChrominanceValues)
    write_byte(0x11)
    write_bytes(AcChrominanceCodesPerBitsize)
    write_bytes(AcChrominanceValues)

    hChrominanceDC=generate_huffman_table(DcChrominanceCodesPerBitsize,DcChrominanceValues)
    hChrominanceAC=generate_huffman_table(AcChrominanceCodesPerBitsize,AcChrominanceValues)

    # 6. Start of Scan (SOS)
    add_marker(0xDA,2 + 1 + 2 * 3 + 3)
    write_byte(3)
    for comp_id in range(1,4):
        write_byte(comp_id)
        write_byte(0x00 if comp_id == 1 else 0x11)
    write_bytes([0,63,0])

    # 7. Preparar tabelas escalonadas
    scaledLum=[0.0]*64
    scaledChr=[0.0]*64
    AanScale=[1,1.387039845,1.306562965,1.175875602,
                1,0.785694958,0.5411961,0.275899379]

    for i in range(64):
        row=ZigZagInv[i] // 8
        col=ZigZagInv[i] % 8
        factor=1.0 / (AanScale[row] * AanScale[col] * 8)
        scaledLum[ZigZagInv[i]]=factor / quantLuminance[i]
        scaledChr[ZigZagInv[i]]=factor / quantChrominance[i]

    # 8. Inicializar Codewords
    codewords=[None]*(2*CodeWordLimit)
    numBits=1
    mask=1
    for value in range(1,CodeWordLimit):
        if value > mask:
            numBits += 1
            mask=(mask << 1) | 1
        codewords[CodeWordLimit - value]={"code": mask - value,"numBits": numBits}
        codewords[CodeWordLimit + value]={"code": value,"numBits": numBits}

    # 9. Loop MCU
    lastYDC=lastCbDC=lastCrDC=0
    blockY=[0.0]*64
    blockCb=[0.0]*64
    blockCr=[0.0]*64

    for y in range(0,height,8):
        for x in range(0,width,8):
            for dy in range(8):
                for dx in range(8):
                    px=min(x+dx,width-1)
                    py=min(y+dy,height-1)
                    pos=(py*width+px)*3
                    r,g,b=pixels[pos],pixels[pos+1],pixels[pos+2]
                    blockY[dy*8+dx]=rgb2y(r,g,b) - 128
                    blockCb[dy*8+dx]=rgb2cb(r,g,b)
                    blockCr[dy*8+dx]=rgb2cr(r,g,b)

            lastYDC=encodeBlock(blockY,scaledLum,lastYDC,hLuminanceDC,hLuminanceAC,codewords)
            lastCbDC=encodeBlock(blockCb,scaledChr,lastCbDC,hChrominanceDC,hChrominanceAC,codewords)
            lastCrDC=encodeBlock(blockCr,scaledChr,lastCrDC,hChrominanceDC,hChrominanceAC,codewords)

    flush();
    write_byte(0xFF); write_byte(0xD9); # EOI

    # Salva o arquivo final
    with open(filename,'wb')as f:f.write(outputBuffer) #salva o arquivo imagem
    print(f"Arquivo python/{filename} salvo.")

# --- Geração das imagens ---
width,height,radius,qtdimagens=400,400,100,120
pixels=bytearray(width*height*3)
os.makedirs("./imagens",exist_ok=True)

for x in range(qtdimagens):
    pixels[:]=bytes([255])*len(pixels)
    if x<qtdimagens/2:
        cx=120+random.randint(0,160); cy=120+random.randint(0,160)
        for y in range(height):
            for px in range(width):
                dx,dy=px-cx,y-cy
                if dx*dx+dy*dy<=radius*radius:
                    pos=(y*width+px)*3; pixels[pos:pos+3]=b"\x00\x00\x00"
    else:
        cx=10+random.randint(0,180); cy=10+random.randint(0,180)
        for y in range(height):
            for px in range(width):
                if px > cx and px < cx + 200 and y > cy and y < cy + 200:
                    pos=(y*width+px)*3; pixels[pos:pos+3]=b"\x00\x00\x00"
    writeJpeg(pixels,width,height,f"imagens/amostra{x:04d}.jpg");

print(f"\n{qtdimagens:d} arquivos imagens salvos com sucesso.");