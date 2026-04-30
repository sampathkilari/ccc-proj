cmake_minimum_required(VERSION 3.10)
project(MiniMax_Engine)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add executable
add_executable(coin_game
    src/main.cpp
    src/Game.cpp
    src/AI.cpp
)

# Include directories
target_include_directories(coin_game PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/include)

# Compiler flags
if(MSVC)
    target_compile_options(coin_game PRIVATE /W4)
else()
    target_compile_options(coin_game PRIVATE -Wall -Wextra -pedantic)
endif()
