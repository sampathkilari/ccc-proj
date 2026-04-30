CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -pedantic
TARGET = coin_game
BUILD_DIR = build
SRC_DIR = src
INCLUDE_DIR = include

SOURCES = $(SRC_DIR)/main.cpp $(SRC_DIR)/Game.cpp $(SRC_DIR)/AI.cpp
OBJECTS = $(patsubst $(SRC_DIR)/%.cpp,$(BUILD_DIR)/%.o,$(SOURCES))

all: $(BUILD_DIR) $(TARGET)

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(TARGET): $(OBJECTS)
	$(CXX) $(CXXFLAGS) -o $@ $^

$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp
	$(CXX) $(CXXFLAGS) -I$(INCLUDE_DIR) -c $< -o $@

run: $(TARGET)
	./$(TARGET)

clean:
	rm -rf $(BUILD_DIR) $(TARGET)

.PHONY: all run clean
